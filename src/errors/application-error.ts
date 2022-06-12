class ApplicationError extends Error {
	public name: string;
	public message: string;
	public code: number;

	constructor (message: string, status: number) {
		super();
		Error.captureStackTrace(this, this.constructor);
		this.name = this.constructor.name;
		this.message = message || 'Something went wrong. Please try again';
		this.code = status || 500;
	}
}

export default ApplicationError;
