import {IGroupProperties} from '../repositories/repositories';
import {Types, Document} from 'mongoose';
import {IMessage} from './message';
import {IUser} from './user';

export type RoomType = 'private' | 'public';

export class RoomTypeValue {
	static PRIVATE: RoomType = 'private';
	static PUBLIC: RoomType = 'public';
}

export interface IRoomDocument extends Document {
	type: string;
	members: Types.ObjectId[];
	properties?: IGroupProperties;
}

export interface IRoom extends Document {
	type: string;
	properties?: IGroupProperties;
	members: IUser[];
	messages: IMessage[];
}