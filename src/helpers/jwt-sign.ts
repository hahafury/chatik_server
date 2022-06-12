import jwt from "jsonwebtoken";
import {IAccessTokens} from "../interfaces/auth";
import {Types} from "mongoose";

/**
 * JWT user signing
 *
 * @param userId
 */
export default (userId: Types.ObjectId): IAccessTokens => {
	const accessToken = jwt.sign({
			id: userId
		},
		process.env.JWT_SECRET as string,
		{
			expiresIn: parseInt(process.env.JWT_REFRESH_TIME as string)
		}
	)
	const refreshToken = jwt.sign({
			id: userId
		},
		process.env.JWT_SECRET as string,
		{
			expiresIn: parseInt(process.env.JWT_REFRESH_TIME as string) + 86400
		}
	)

	return {accessToken, refreshToken}
}