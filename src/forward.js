import net from "net";
export default (socket, data, host, port) => {
	try {
		const s = net.createConnection({ host, port });
		s.write(data, () => {
			s.pipe(socket);
			socket.pipe(s);
		});
	} catch (e) {
		elog(e);
	}
};

export const fwd = (socket, host, port) => {
	try {
		const s = net.createConnection({ host, port });
		s.pipe(socket);
		socket.pipe(s);
	} catch (e) {
		elog(e);
	}
};

export const elog = e => console.error(e.toString());
