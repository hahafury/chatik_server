const mongoose = require('mongoose');
import config from '../config';

/**
 *
 * @param callback callback after mongoose init
 */
const dbConnect = (callback: () => void): void =>  {
	mongoose.connect(
		`mongodb://${ config.host }:${ config.port }/${ config.database }`,
		{ useNewUrlParser: true, useUnifiedTopology: true }, (err: any) => {
			if (err) {
				console.log(err);
				process.exit(1);
			} else {
				callback();
			}
		});
}


export default dbConnect;