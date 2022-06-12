import {model, Schema, Types} from 'mongoose';
import {IMessage} from '../types/message';

const UserSchema = {
	_id: Types.ObjectId,
	password: String,
	email: String,
	username: String,
	photo: String || undefined,
}

const schema: Schema<IMessage> = new Schema<IMessage>({
	roomId: {type: Types.ObjectId, required: true, ref: 'rooms'},
	sender: {type: UserSchema},
	images: {type: [String]},
	type: {type: String, required: true},
	body: {type: String, required: true},
	createdAt: {type: String, required: true, default: Date.now().toString()}
});

const MessageModel = model<IMessage>('messages', schema);

export default MessageModel;
