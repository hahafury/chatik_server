import {Types} from "mongoose";
import {IUser} from "./user";

export interface IMessageDocument {
	roomId?: Types.ObjectId;
	sender: IUser;
	body: string;
	createdAt: string;
}

export interface IMessage {
	_id?: Types.ObjectId;
	roomId?: Types.ObjectId;
	sender: IUser;
	body: string;
	type: MessageType;
	images?: string[];
	createdAt: string;
}

export type MessageType = 'SYSTEM' | 'MESSAGE';

export class MessageTypeValue {
	static SYSTEM: MessageType = 'SYSTEM';
	static MESSAGE: MessageType = 'MESSAGE';
}