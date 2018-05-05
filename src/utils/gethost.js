import os from "os";

const s = ":";
const host = "host";

export default data => {
	const lines = data.toString().split(os.EOL);
	const len = lines.length;
	for (let i = 0; i < len; i++) {
		const [a, b, c] = lines[i].split(s, 3);
		if (a.toLowerCase() == host) {
			return {
				host: b.trim(),
				port: c ? c : 80
			};
		}
	}
	return {};
};
