import {RoomType} from '../types/room';
import {Aggregate} from 'mongoose';
import RoomModel from '../models/Room';
import MessageModel from '../models/Message';
import {IRoom} from '../types/room';
import UserModel from '../models/User';

export interface GetRoomsPredicate {
	name?: string;
	limit?: number;
	offset?: number;
	type?: RoomType;
}

export interface GetRoomPredicate {
	roomId?: number;
	userId?: number;
}

/**
 * Get room mongoose request
 *
 * @param predicate
 */
export const getRoom = async (predicate: any): Promise<IRoom | null> => {
	const room = (await RoomModel.aggregate([
		{
			$match: predicate
		},
		{
			$lookup: {
				from: MessageModel.collection.name,
				localField: '_id',
				foreignField: 'roomId',
				as: 'messages'
			}
		},
		{
			$lookup: {
				"from": "users",
				"let": {"members": "$members"},
				pipeline: [
					{"$match": {"$expr": {"$in": ["$_id", "$$members"]}}}
				],
				as: "members"
			}
		},
		{
			$project: {
				'_id': 1,
				'type': 1,
				'messages': 1,
				'members': 1,
				'properties': 1
			}
		}
	]))[0];
	return room ?? null;
}

/**
 * Get rooms mongoose request
 *
 * @param predicate
 */
export const getRooms = (predicate: any): Aggregate<IRoom[]> => {
	return RoomModel.aggregate([
		{
			$match: predicate
		},
		{
			$lookup: {
				from: MessageModel.collection.name,
				localField: '_id',
				foreignField: 'roomId',
				as: 'messages',
			}
		},
		{
			$lookup: {
				from: UserModel.collection.name,
				localField: 'properties.authorId',
				foreignField: '_id',
				as: 'author',
			}
		},
		{
			$sort: {
				"messages.createdAt": -1
			}
		},
		{
			$lookup: {
				from: 'users',
				let: {members: '$members'},
				pipeline: [
					{$match: {$expr: {$in: ['$_id', '$$members']}}}
				],
				as: 'members'
			}
		},
		{
			$project: {
				'_id': 1,
				'type': 1,
				'messages': 1,
				'members': 1,
				'preview': { $arrayElemAt: [ '$messages', -1 ] },
				'properties': 1
			}
		}
	])
};
