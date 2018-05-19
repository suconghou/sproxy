import net from "net";
const r = "error";
export default (socket, data, host, port) => {
	const s = net
		.createConnection({ host, port }, () => {
			s.write(data, () => {
				s.pipe(socket).on(r, e => {
					s.destroy();
				});
				socket.pipe(s).on(r, e => {
					socket.destroy();
				});
			});
		})
		.on(r, e => {
			socket.destroy();
		});
};

export const fwd = (socket, host, port) => {
	const s = net
		.createConnection({ host, port }, () => {
			s.pipe(socket).on(r, e => {
				s.destroy();
			});
			socket.pipe(s).on(r, e => {
				socket.destroy();
			});
		})
		.on(r, e => {
			socket.destroy();
		});
};

export const elog = e => console.error(e.toString());
