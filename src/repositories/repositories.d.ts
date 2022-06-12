import {RoomType} from "../interfaces/chat";
import {IUser} from "../types/user";

export interface IGroupProperties {
	author: IUser;
	name: string;
	photo?: string;
}

export interface cICreateRoomData {
	type: RoomType;
	properties?: IGroupProperties
}