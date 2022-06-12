import * as chatRepository from "../repositories/chat";
import {GetRoomsPredicate} from "../repositories/chat";
import {RoomTypeValue} from "../interfaces/chat";
import {IAddMessageRequestData} from "../interfaces/params";
import {ICreateGroupData} from "../types/services";
import UserModel from "../models/User";
import RoomModel from '../models/Room';
import MessageModel from '../models/Message';
import {IUser} from '../types/user';
import {IMessage, MessageTypeValue} from "../types/message";
import {IRoom, IRoomDocument} from "../types/room";
import {Types, Query, Aggregate} from "mongoose";
import ServerError from "../errors/server-error";
import {GROUP_AVATAR_DEFAULT_PATH, UPLOAD_DEFAULT_PATH} from "../constants";

/**
 *
 * @param user - User
 */
export const getUserRooms = (user: IUser): Aggregate<IRoom[]> => {
	return chatRepository.getRooms({
		members: {$in: [user._id]}
	});
};

/**
 *
 * @param user - User
 * @param predicate - search predicate
 */
export const search = async (user: IUser, predicate: GetRoomsPredicate): Promise<any> => {
	const users = await UserModel.find({
		_id: {
			$ne: new Types.ObjectId(user.id)
		},
		username: {
			$regex: predicate.name, $options: 'i'
		}
	});
	const rooms = await chatRepository.getRooms({
		type: RoomTypeValue.PUBLIC,
		properties: {
			name: {
				$regex: predicate.name, $options: 'i'
			}
		}
	});

	return {
		users,
		rooms
	};
};

/**
 *
 * @param user - user data
 * @param addMessageData - message data
 * @param files - multer files
 */
export const addMessage = async (user: IUser, addMessageData: string, files: Express.Multer.File[] | undefined): Promise<IRoom> => {
	let result: IRoom | null = null;
	const parsedMessageData = (JSON.parse(addMessageData)) as IAddMessageRequestData;
	if (parsedMessageData.target.type === RoomTypeValue.PUBLIC && parsedMessageData.target.roomId) {
		const room: IRoom | null = await chatRepository.getRoom({_id: new Types.ObjectId(parsedMessageData.target.roomId)});
		if (room) {
			const message: IMessage = await MessageModel.create({
				roomId: room._id,
				body: parsedMessageData.body,
				images: files?.map(file => {
					return UPLOAD_DEFAULT_PATH + file.filename
				}) ?? null,
				type: MessageTypeValue.MESSAGE,
				sender: user
			});
			room.messages.push(message)
			result = room;
		}
	}

	if (parsedMessageData.target.type === RoomTypeValue.PRIVATE && parsedMessageData.target.recipientId) {
		const room: IRoom | null = await chatRepository.getRoom({
			type: RoomTypeValue.PRIVATE,
			members: {$in: [user._id, parsedMessageData.target.recipientId]}
		});
		if (!room) {
			const newRoom: IRoomDocument = await RoomModel.create({
				type: RoomTypeValue.PRIVATE,
				members: [user.id, parsedMessageData.target.recipientId]
			});
			const message: IMessage = await MessageModel.create({
				roomId: newRoom._id,
				body: parsedMessageData.body,
				images: files?.map(file => {
					return UPLOAD_DEFAULT_PATH + file.filename
				}) ?? null,
				type: MessageTypeValue.MESSAGE,
				sender: user
			});
			const _newRoom: IRoom | null = await chatRepository.getRoom({_id: newRoom._id});
			if (_newRoom) {
				_newRoom.messages.push(message);
				result = _newRoom;
			}
		}
		if (room) {
			const message: IMessage = await MessageModel.create({
				roomId: room._id,
				body: parsedMessageData.body,
				sender: user,
				images: files?.map(file => {
					return UPLOAD_DEFAULT_PATH + file.filename
				}) ?? null,
				type: MessageTypeValue.MESSAGE,
			});
			room.messages.push(message);
			result = room;
		}
	}

	return result as IRoom;
};

/**
 *
 * @param user - user data
 */
export const getContacts = async (user: IUser): Promise<IUser[]> => {
	const contacts: IUser[] = [];

	const privateRooms: IRoom[] = await chatRepository.getRooms({
		type: RoomTypeValue.PRIVATE,
		members: {$in: [user._id]}
	});

	privateRooms.forEach(room => {
		contacts.push((room.members.find(_user => !_user._id.equals(user._id))) as IUser);
	});

	return contacts;
};

/**
 *
 * @param user user data
 * @param groupData new group data
 * @param image group image
 */
export const createGroup = async (user: IUser, groupData: string, image?: Express.Multer.File): Promise<IRoom> => {
	const parsedGroupData = JSON.parse(groupData) as ICreateGroupData;

	if (!parsedGroupData.name) {
		throw new ServerError('Group must include name property');
	}

	const newGroup: IRoomDocument = await RoomModel.create({
		type: RoomTypeValue.PUBLIC,
		members: [...parsedGroupData.userIds, user._id],
		properties: {
			authorId: user._id,
			name: parsedGroupData.name,
			photo: image ?  UPLOAD_DEFAULT_PATH + image.filename : GROUP_AVATAR_DEFAULT_PATH
		}
	});

	return (await chatRepository.getRoom({_id: newGroup._id})) as IRoom;
};

/**
 *
 * @param user - user data
 * @param username - username for founded users
 */
export const getUsers = (user: IUser, username: string): Query<IUser[], any> => {
	return UserModel.find({
		username: {
			$regex : username + '.*',
		},
		_id: {
			$ne: user._id
		}
	});
};
