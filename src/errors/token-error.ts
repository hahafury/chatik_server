import ApplicationError from "./application-error";

class TokenError extends ApplicationError {
	constructor (message?: string) {
		super(message || 'Token was expired', 403);
	};
}

export default TokenError;

