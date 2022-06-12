export interface ISocketEvent {
	event: string;
	payload: any;
}

export type SocketEventType = 'new-message' | 'notification' | 'new-group' | 'update-user';

export class SocketEventValue {
	static SOCKET_NEW_MESSAGE_EVENT: SocketEventType = 'new-message';
	static SOCKET_NOTIFICATION_EVENT: SocketEventType = 'notification';
	static SOCKET_NEW_GROUP_EVENT: SocketEventType = 'new-group';
	static SOCKET_UPDATE_USER: SocketEventType = 'update-user';
}

export class SocketEvent implements ISocketEvent {
	private readonly _event: SocketEventType;
	private readonly _payload: any;

	constructor(event: SocketEventType, payload: any) {
		this._event = event;
		this._payload = payload;
	}

	get event() {
		return this._event;
	}

	get payload() {
		return this._payload;
	}
}