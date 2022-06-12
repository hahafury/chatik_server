import {IRoom} from "./chat";

export interface ILogin {
	email: string;
	password: string;
}

export interface ISignup {
	username: string;
	email: string;
	password: string;
	phone: string;
}

export interface IAccessTokens {
	accessToken: string;
	refreshToken: string;
}

export interface ITokenData {
	id: number;
}