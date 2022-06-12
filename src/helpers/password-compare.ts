import bcrypt from "bcryptjs";

/**
 * Helper for compare password
 *
 * @param receivedPassword
 * @param comparisonPassword
 */
export default async (receivedPassword: string, comparisonPassword: string): Promise<any> => {
	const passwordCompare = await bcrypt.compare(receivedPassword, comparisonPassword);

	if (!passwordCompare) {
		throw new Error('Wrong password');
	}
};