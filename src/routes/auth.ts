import hashPassword from '../middlewares/hash-password';
import * as authController from '../controllers/auth';
import {Router} from 'express';
import checkToken from '../middlewares/check-token';
import imageUpload from '../middlewares/parse-img';

/**
 *
 * @param router - express router
 */
export default (router: Router): void => {
	router.post(
		'/signup',
		hashPassword,
		authController.signup
	);

	router.post(
		'/login',
		authController.login
	);

	router.get(
		'/user',
		checkToken,
		authController.getUser
	);

	router.patch(
		'/user',
		checkToken,
		imageUpload.single('photo'),
		authController.updateUser
	)
};
