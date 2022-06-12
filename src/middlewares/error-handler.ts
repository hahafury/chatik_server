import {AppError} from '../interfaces/base';
import {NextFunction, Request, Response} from 'express';

/**
 * Error handler
 *
 * @param error
 * @param req
 * @param res
 * @param next
 */
export default (error: AppError, req: Request, res: Response, next: NextFunction): void => {
	res.status(error.code ?? 500).send(error.message ?? 'Server Error');
};