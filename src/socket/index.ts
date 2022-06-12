import {Server, Socket} from "socket.io";

class WebSocket {
	private io: Server;

	constructor(io: Server) {
		this.io = io;
		this.listen();
	}

	/**
	 * Listen socket join
	 */
	public listen(): void {
		this.io.on('connection', (socket: Socket): void => {
			this.onJoin(socket);
		});
	};

	/**
	 * On socket joining
	 *
	 * @param socket
	 */
	public onJoin(socket: Socket): void {
		socket.on('join', (joinData: any): void => {
			socket.join(joinData.roomName + '-' + joinData.id);
		});
	};
}

export default WebSocket;