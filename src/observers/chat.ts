import {IUser} from '../types/user';
import {Subject} from 'rxjs';
import {socket} from '../../app';
import {IRoom} from '../types/room';
import {IChatObserver} from '../types/observers';
import {SocketEventValue} from "../types/socket";

const newMessageSubject = new Subject<IRoom>();
const newRoomSubject = new Subject<IRoom>();

newMessageSubject.subscribe({
	next: room => {
		const newMessage = room.messages[room.messages.length - 1];
		const userRoomsForNotification: string[] = room.members
			?.filter((user: IUser) => user._id !== newMessage.sender._id)
			.map((user: IUser): string => {
				return 'user-' + user._id;
			});
		socket
			.to(userRoomsForNotification)
			.emit(SocketEventValue.SOCKET_NEW_MESSAGE_EVENT, newMessage);
	}
});

newRoomSubject.subscribe({
	next: room => {
		const userRoomsForNotification: string[] = [];
		room.members
			.forEach(user => userRoomsForNotification.push('user-' + user._id.toString()));
		console.log(userRoomsForNotification)
		socket
			.to(userRoomsForNotification)
			.emit(SocketEventValue.SOCKET_NEW_GROUP_EVENT, room);
	}
});

export default {
	newMessageSubject,
	newRoomSubject
} as IChatObserver;