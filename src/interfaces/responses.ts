import {IUser} from "../types/user";
import {IRoom} from './chat';

export interface IAddMessageResponse {
	id: number;
	body: string;
	user: IUser;
	room: IRoom;
}