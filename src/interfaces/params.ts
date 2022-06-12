import {RoomType} from "./chat";
import {Types} from "mongoose";

export interface IAddMessageRequestData {
	body: string;
	target: IAddMessageTarget;
}

export interface IAddMessageData {
	body: string;
	images: any
}

export interface IAddMessageTarget {
	type: RoomType;
	roomId: Types.ObjectId | undefined;
	recipientId: Types.ObjectId | undefined;
}