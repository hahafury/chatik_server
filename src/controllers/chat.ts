import {NextFunction, Request, Response} from "express";
import * as chatService from "../services/chat";
import ApplicationError from "../errors/application-error";
import {GetRoomPredicate, GetRoomsPredicate} from "../repositories/chat";
import chatObserver from "../observers/chat";
import {IRoom} from "../types/room";

/**
 *
 * @param req - request
 * @param res - response
 * @param next - next function
 */
export const getUserRooms = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try {
		res.send(
			await chatService.getUserRooms(req.user)
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
export const search = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try {
		res.send(
			await chatService.search(req.user, req.query as GetRoomsPredicate)
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
export const addMessage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try {
		const result = await chatService.addMessage(
			req.user,
			req.body.messageData,
			req.files as Express.Multer.File[] | undefined
		);
		res.sendStatus(201);
		console.log(result)
		chatObserver.newMessageSubject.next(result);
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
export const getContacts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try {
		res.send(await chatService.getContacts(req.user));
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
export const createGroup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try {
		console.log(req.body)
		const room: IRoom = await chatService.createGroup(req.user, req.body.groupData, req.file);
		res.send(room);
		chatObserver.newRoomSubject.next(room);
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
export const getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try {
		res.send(await chatService.getUsers(req.user, req.query.username as string));
	} catch (error) {
		next(error);
	}
};
