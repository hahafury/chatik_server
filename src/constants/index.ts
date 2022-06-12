export enum CONSTANTS {
	SOCKET_NEW_MESSAGE_EVENT = 'new-message',
	SOCKET_NOTIFICATION_EVENT = 'notification',
}

export enum SOCKET_EVENTS {
	SOCKET_NEW_MESSAGE_EVENT = 'new-message',
	SOCKET_NOTIFICATION_EVENT = 'notification',
	SOCKET_NEW_GROUP_EVENT = 'new-group',
	SOCKET_UPDATE_USER = 'update-user'
}

export const INSTANCES_MAX_FIELD_LENGTH = {
	USER: {
		USERNAME: 15,
		BIO: 255,
	},
	MESSAGE: {
		BODY: 255
	},
	ROOM: {
		NAME: 35
	}
}

export const NEW_USER_DEFAULT_AVATAR = `http://${process.env.API_HOST}:${process.env.API_PORT}/public/user-avatar-plug.jpg`;

export const USER_AVATAR_DEFAULT_PATH = `http://${process.env.API_HOST}:${process.env.API_PORT}/public/users/`;

export const UPLOAD_DEFAULT_PATH = `http://${process.env.API_HOST}:${process.env.API_PORT}/public/users/`;

export const GROUP_AVATAR_DEFAULT_PATH = `http://${process.env.API_HOST}:${process.env.API_PORT}/public/default-group-plug.png`;