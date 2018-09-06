import process from 'process';

import { echoserver, fwdserver, sniserver } from './forward';

const p = i => /^\d{1,5}$/.test(i);

const port = process.env.PORT || 80;
const sslport = process.env.SSLPORT || 443;
const echoport = process.env.ECHOPORT;

const f_host = process.env.FORWARD_HOST;
const f_port = process.env.FORWARD_PORT;

if (p(echoport)) {
	echoserver(echoport);
} else if (f_host && p(f_port)) {
	fwdserver(port, f_host, f_port);
} else {
	sniserver(port, sslport);
}
