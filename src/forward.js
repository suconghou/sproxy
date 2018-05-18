import net from "net";
const r = "error";
const t = "timeout";
export default (socket, data, host, port) => {
	const s = net
		.createConnection({ host, port }, () => {
			s.write(data, () => {
				s
					.pipe(socket)
					.on(r, e => {
						s.destroy(e);
					})
					.on(t, e => {
						s.destroy(e);
					});
				socket
					.pipe(s)
					.on(r, e => {
						socket.destroy(e);
					})
					.on(t, e => {
						socket.destroy(e);
					});
			});
		})
		.on(r, e => {
			socket.destroy(e);
		});
};

export const fwd = (socket, host, port) => {
	const s = net
		.createConnection({ host, port }, () => {
			s
				.pipe(socket)
				.on(r, e => {
					s.destroy(e);
				})
				.on(t, e => {
					s.destroy(e);
				});
			socket
				.pipe(s)
				.on(r, e => {
					socket.destroy(e);
				})
				.on(t, e => {
					socket.destroy(e);
				});
		})
		.on(r, e => {
			socket.destroy(e);
		});
};

export const elog = e => console.error(e.toString());
