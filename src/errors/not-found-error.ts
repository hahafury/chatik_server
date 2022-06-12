import ApplicationError from "./application-error";

class NotFoundError extends ApplicationError {
	constructor (message?: string) {
		super(message || 'The requested resource is not found', 404);
	};
}

export default NotFoundError;

