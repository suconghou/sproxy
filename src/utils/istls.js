// https://github.com/jessetane/is-tls-client-hello/blob/master/index.js
export default data => {
	const headers = 5;
	if (data.length < headers) return false;
	if (data[0] !== 22) return false;
	const majorVersion = data[1];
	const minorVersion = data[2];
	if (majorVersion !== 3) return false;
	if (minorVersion < 1 || minorVersion > 3) return false;
	const length = (data[3] << 8) | data[4];
	if (data.length < headers + length) return false;
	if (data[5] !== 1) return false;
	return true;
};
