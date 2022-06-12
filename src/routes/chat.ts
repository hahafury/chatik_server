import * as chatController from "../controllers/chat";
import {Router} from "express";
import checkToken from "../middlewares/check-token";
import imageUpload from "../middlewares/parse-img";

/**
 *
 * @param router - express router
 */
export default (router: Router): void => {
	router.get(
		'/rooms',
		checkToken,
		chatController.getUserRooms
	);

	router.get(
		'/users',
		checkToken,
		chatController.getUsers
	);

	router.post(
		'/message',
		checkToken,
		imageUpload.array('images[]'),
		chatController.addMessage
	);

	router.get(
		'/rooms/search',
		checkToken,
		chatController.search
	);

	router.get(
		'/contacts',
		checkToken,
		chatController.getContacts
	);

	router.post(
		'/group',
		checkToken,
		imageUpload.single('image'),
		chatController.createGroup
	);
};
