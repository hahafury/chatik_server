import ApplicationError from './application-error';

class ServerError extends ApplicationError {
	constructor (message?: string) {
		super(message || 'Bad request', 400);
	};
}

export default ServerError;

