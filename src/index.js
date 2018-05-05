import process from "process";

import gethost from "./utils/gethost";
import sni from "./utils/sni";
import istls from "./utils/istls";
import serve, { echo } from "./utils/serve";
import forward, { fwd } from "./forward";

const p = i => /^\d{1,5}$/.test(i);

const port = process.env.PORT || 80;
const sslport = process.env.SSLPORT || 443;
const echoport = process.env.ECHOPORT;

const forward_host = process.env.FORWARD_HOST;
const forward_port = process.env.FORWARD_PORT;

if (p(echoport)) {
	serve(echo).listen(echoport);
} else if (forward_host && p(forward_port)) {
	serve(fwd).listen(port);
} else {
	const handler = socket => {
		socket.once("data", data => {
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
				forward(socket, data, host, port);
			} else {
				socket.write(data, () => {
					socket.pipe(socket);
				});
			}
		});
	};

	serve(handler).listen(port);
}
