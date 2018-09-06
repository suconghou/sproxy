import net from 'net';
import gethost from './utils/gethost';
import sni from './utils/sni';
import istls from './utils/istls';
import serve, { echo } from './utils/serve';

const r = 'error';
const elog = e => console.error(e.toString());

const sniproxy = (socket, data, host, port) => {
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

const fwd = (socket, host, port) => {
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

const echoserver = port => {
	serve(echo).listen(port);
};

const fwdserver = (port, f_host, f_port) => {
	const f = s => fwd(s, f_host, f_port);
	serve(f).listen(port);
};

const sniserver = (port, sslport) => {
	const handler = socket => {
		socket
			.once('data', data => {
				let host, port;
				if (istls(data)) {
					host = sni(data);
					port = sslport;
				} else {
					const info = gethost(data);
					host = info.host;
					port = info.port;
				}
				if (host) {
					sniproxy(socket, data, host, port);
				} else {
					socket.write(data, () => {
						socket.pipe(socket);
					});
				}
			})
			.on('error', elog);
	};

	serve(handler).listen(port);
};

export { elog, echoserver, fwdserver, sniserver };
