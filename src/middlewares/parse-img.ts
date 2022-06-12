import multer from 'multer';
import * as path from 'path';

const storage = multer.diskStorage({
	destination: (req, file, cb): void => {
		console.log(file)
		cb(null, path.join(path.join(__dirname,'../', '../public/users')));
	},
	filename: (req, file, cb): void => {
		if (file.fieldname === 'images[]') {
			const extArray = file.mimetype.split('/');
			const extension = extArray[extArray.length - 1];
			cb(null, Date.now() + '_' + file.originalname + '.' + extension);
		} else {
			cb(null, Date.now() + '_' + file.originalname);
		}
	},
});

const imageUpload: multer.Multer = multer({ storage: storage });

export default imageUpload;