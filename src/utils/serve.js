import net from "net";

export default handler => {
	return net.createServer(handler);
};

export const echo = socket => {
	socket.pipe(socket);
};
