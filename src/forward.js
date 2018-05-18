import net from "net";
const r = "error";
export default (socket, data, host, port) => {
	const s = net
		.createConnection({ host, port }, () => {
			s.write(data, () => {
				s.pipe(socket);
				socket.pipe(s);
			});
		})
		.on(r, elog);
};

export const fwd = (socket, host, port) => {
	const s = net
		.createConnection({ host, port }, () => {
			s.pipe(socket);
			socket.pipe(s);
		})
		.on(r, elog);
};

export const elog = e => console.error(e.toString());
