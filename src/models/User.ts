import {model, Schema} from 'mongoose';
import {IUser} from "../types/user";

const schema: Schema<IUser> = new Schema<IUser>({
	email: {type: String, required: true},
	password: {type: String, required: true},
	username: {type: String, required: true},
	bio: {type: String,},
	photo: {type: String,},
});

const UserModel = model<IUser>('users', schema);

export default UserModel;
