import {IUser} from '../types/user';
import {IGroupProperties} from "../repositories/repositories";

export type RoomType = 'private' | 'public';

export class RoomTypeValue {
	static PRIVATE: RoomType = 'private';
	static PUBLIC: RoomType = 'public';
}

export interface IRoom extends Document {
	type: string;
	preview?: IMessage;
	interlocutor?: IUser;
	properties?: IGroupProperties;
}

export interface IMessage {
	id: number;
	user: IUser;
	body: string;
	room?: IRoom;
	createdAt: string;
	updatedAt: string;
}