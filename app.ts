import dotenv from "dotenv";
dotenv.config({path: './.env'})
import dbConnect from "./src/connections/mongoose";
import express, {Express} from 'express';
import http from 'http';
import router from "./src/routes";
import cors from 'cors';
import errorHandler from './src/middlewares/error-handler';
import socketInit from './socket-init';
import path from 'path';

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/public/users', express.static(path.join(__dirname, 'public', 'users')));
app.use('/public/uploads', express.static(path.join(__dirname, 'public', 'uploads')));
app.use(router);
app.use(errorHandler);

const server: http.Server = http.createServer(app);

dbConnect(() => {
	server.listen(process.env.API_PORT, () => {
		console.log('started');
	});
});

export const socket = socketInit(server);