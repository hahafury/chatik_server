import ApplicationError from './application-error';

class ServerError extends ApplicationError {
	constructor (message?: string) {
		super(message || 'Server error', 500);
	};
}

export default ServerError;

