import net from "net";
export default (socket, data, host, port) => {
	const s = net.createConnection({ host, port });
	s.write(data, () => {
		s.pipe(socket);
		socket.pipe(s);
	});
};

export const fwd = (socket, host, port) => {
	const s = net.createConnection({ host, port });
	s.pipe(socket);
	socket.pipe(s);
};
