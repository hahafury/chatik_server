import * as mongoose from "mongoose";

export interface IServerConfig {
	database: string;
	port: number;
	host: string;
}

export type ObjectIdConstructor = {
	(str: string): mongoose.Types.ObjectId;
	new (str: string): mongoose.Types.ObjectId;
}