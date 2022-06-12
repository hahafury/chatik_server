import {Types} from "mongoose";

export interface ICreateGroupData {
	userIds: Types.ObjectId[];
	name: string;
}

export interface IMulterFile {
	filename: string;
	file: File;
}

export interface IUpdateUserData {
	photo?: IMulterFile;
	username?: string;
	bio?: string;
	phone?: string;
}

export interface IUpdateUserReturn {
	id: string;
	photo?: string;
	username?: string;
	bio?: string;
	phone?: string;
}