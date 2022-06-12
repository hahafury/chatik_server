import {model, Schema, Types} from 'mongoose';
import {IRoomDocument} from "../types/room";

const PropertiesSchema = {
	authorId: Types.ObjectId,
	name: String,
	photo: String
}

const schema: Schema<IRoomDocument> = new Schema<IRoomDocument>({
	type: {type: String, required: true},
	members: {type: [Types.ObjectId], required: true},
	properties: PropertiesSchema,
});

const RoomModel = model<IRoomDocument>('rooms', schema);

export default RoomModel;