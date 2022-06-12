import {Request, Response, NextFunction} from "express";
import * as authService from "../services/auth";
import authObserver from '../observers/auth';
import {IUpdateUserReturn} from "../types/services";

/**
 *
 * @param req - request
 * @param res - response
 * @param next - next function
 */
export const signup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try{
		res.send(
			await authService.signup(req.body)
		);
	} catch (error) {
		next(error);
	}
};

/**
 *
 * @param req - request
 * @param res - response
 * @param next - next function
 */
export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try{
		res.send(
			await authService.login(req.body)
		);
	} catch (error) {
		next(error);
	}
};

/**
 *
 * @param req - request
 * @param res - response
 * @param next - next function
 */
export const getUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try {
		res.send(req.user);
	} catch (error) {
		next(error);
	}
};

/**
 *
 * @param req - request
 * @param res - response
 * @param next - next function
 */
export const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try {
		const updatedUserData: IUpdateUserReturn = await authService.updateUser(req.user, req.body.userData, req.file);
		authObserver.updateUserSubject.next(updatedUserData)
		res.sendStatus(200)
	} catch (error) {
		next(error)
	}
};
