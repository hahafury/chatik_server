import { Server } from "socket.io";
import http from "http";
import WebSocket from "./src/socket";

const cors = {
	origin: '*',
};

export default (httpServer: http.Server): Server => {
	const io: Server = new Server(httpServer, { cors });
	new WebSocket(io);
	return io;
};
