import ApplicationError from "./application-error";

class AlreadyExistsError extends ApplicationError {
	constructor (message?: string) {
		super(message || 'There was a conflict, please try again later', 409);
	};
}

export default AlreadyExistsError;

