import {Types, Document} from "mongoose";

export interface IUser extends Document {
	_id: Types.ObjectId;
	username: string;
	password: string;
	email: string;
	phone: string;
	bio?: string;
	photo: string;
}