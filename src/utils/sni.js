// https://github.com/buschtoens/sni/blob/master/index.js
export default data => {
	let end = data.length;
	let pos = 43;
	if (pos > end - 1) return null;
	let sessionIdLength = data[pos];
	pos += 1 + sessionIdLength;
	if (pos > end - 2) return null;
	let cipherSuiteLength = (data[pos] << 8) | data[pos + 1];
	pos += 2 + cipherSuiteLength;
	if (pos > end - 1) return null;
	let compressionMethodLength = data[pos];
	pos += 1 + compressionMethodLength;
	if (pos > end - 2) return null;
	let extensionsLength = (data[pos] << 8) | data[pos + 1];
	pos += 2;
	let extensionsEnd = pos + extensionsLength;
	if (extensionsEnd > end) return null;
	end = extensionsEnd;
	while (pos <= end - 4) {
		let extensionType = (data[pos] << 8) | data[pos + 1];
		let extensionSize = (data[pos + 2] << 8) | data[pos + 3];
		pos += 4;
		if (extensionType === 0) {
			if (pos > end - 2) return null;
			let nameListLength = (data[pos] << 8) | data[pos + 1];
			pos += 2;
			let n = pos;
			pos += nameListLength;
			if (pos > end) return null;
			while (n < pos - 3) {
				let nameType = data[n];
				let nameLength = (data[n + 1] << 8) | data[n + 2];
				n += 3;
				if (nameType === 0) {
					if (n > end - nameLength) return null;
					return data.toString("ascii", n, n + nameLength);
				} else {
					n += nameLength;
				}
			}
		} else {
			pos += extensionSize;
		}
	}
	return null;
};
