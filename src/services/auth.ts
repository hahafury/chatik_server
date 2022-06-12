import {ITokenData} from '../interfaces/auth';
import {IUser} from '../types/user';
import {IAccessTokens, ILogin} from '../interfaces/auth';
import jwtSign from '../helpers/jwt-sign';
import passwordCompare from '../helpers/password-compare';
import jwt from 'jsonwebtoken';
import AlreadyExistsError from '../errors/already-exists-error';
import NotFoundError from '../errors/not-found-error';
import UserModel from '../models/User';
import {INSTANCES_MAX_FIELD_LENGTH, NEW_USER_DEFAULT_AVATAR, USER_AVATAR_DEFAULT_PATH} from '../constants';
import BadRequestError from '../errors/bad-request-error';
import {Express} from "express";
import {IUpdateUserData, IUpdateUserReturn} from "../types/services";

/**
 *
 * @param signupData - signup data
 */
export const signup = async (signupData: IUser): Promise<IAccessTokens> => {
	if (signupData.username.length > INSTANCES_MAX_FIELD_LENGTH.USER.USERNAME) {
		throw new BadRequestError('Username characters length must be less than 255')
	}
	const foundUser = await UserModel.findOne({
		email: signupData.email
	});
	if (foundUser) {
		throw new AlreadyExistsError('User with this login already exists');
	}
	const {_id} = await UserModel.create({...signupData, photo: NEW_USER_DEFAULT_AVATAR});
	return jwtSign(_id);
};

/**
 *
 * @param loginData - login data
 */
export const login = async (loginData: ILogin): Promise<IAccessTokens> => {
	const foundUser: IUser | null = await UserModel.findOne({email: loginData.email});
	if (!foundUser) {
		throw new NotFoundError('User with this email was not found');
	}
	await passwordCompare(loginData.password, foundUser.password);
	return jwtSign(foundUser._id);
};

/**
 *
 * @param accessTokens user access tokens
 */
export const getUser = async (accessTokens: IAccessTokens) => {
	const {id} = (jwt.verify(accessTokens.accessToken, process.env.JWT_SECRET as string)) as ITokenData;
	return UserModel.findOne({_id: id});
};

/**
 *
 * @param user - user data
 * @param userDataJson - updated user data in JSON
 * @param photo - new user photo
 */
export const updateUser = async (user: IUser, userDataJson: string, photo: Express.Multer.File | undefined): Promise<IUpdateUserReturn> => {
	const parsedUserData = (JSON.parse(userDataJson)) as IUpdateUserData;

	await UserModel.updateOne({
		_id: user._id
	}, {
		...parsedUserData,
		photo: photo ? USER_AVATAR_DEFAULT_PATH + photo.filename : user.photo
	});

	return {
		...parsedUserData,
		id: user._id.toString(),
		photo: photo ? USER_AVATAR_DEFAULT_PATH + photo.filename : user.photo
	}
}