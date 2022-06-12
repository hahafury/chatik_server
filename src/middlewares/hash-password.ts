import {NextFunction, Request, Response} from "express";
import bcrypt from "bcryptjs";

export default async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try {
		req.body.password = await bcrypt.hash(req.body.password, parseInt(process.env.SALT_ROUNDS as string));
		next();
	} catch (err) {
		next(new Error('Server Error on hash password'));
	}
};