import {NextFunction, Request, Response} from "express";
import {getUser} from "../services/auth";
import TokenError from "../errors/token-error";
import {IAccessTokens} from "../interfaces/auth";
import {IUser} from "../types/user";

export default async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	if (!req.headers.authorization) {
		return next(new TokenError('Token was not found'));
	}
	try {
		const authorizationTokens: IAccessTokens = JSON.parse(req.headers.authorization);
		req.user = (await getUser(authorizationTokens)) as IUser;
		next();
	} catch (error) {
		next(error)
	}
};