const http = require('http');
const url = require('url');
const MHZ19B = require('mh-z19b');
const i2c = require('i2c-bus');

const PORT = 3000;
const HOST = '0.0.0.0';

const mhz19b = new MHZ19B('/dev/ttyS0');
mhz19b.abcOff();

const server = http.createServer(async (req, res) => {
	const route = url.parse(req.url).pathname;
	if (route === '/co2') {
		try {
			const co2res = await mhz19b.readCO2();
			res.writeHead(200, {'Content-Type': 'text/plain;'});
			res.write(`co2 ${co2res.co2}`);
			res.write('\n');
			res.end(`temp ${co2res.temperature}`);

		} catch(e) {
			console.error(e);
			res.writeHead(500, {});
			res.end(e);
		}
	return;
	} else if (route === '/allmhz19') {
		try {
			const co2res = await mhz19b.readCO2();
			res.writeHead(200, {'Content-Type': 'application/json'});
			res.end(JSON.stringify(co2res));

		} catch(e) {
			console.error(e);
			res.writeHead(500, {});
			res.end(e);
		}
		return;
	} else if (route === '/gy21') {
		try {
			const HTU21D_TEMP = 0xF3;
			const HTU21D_HUMID = 0xF5;
			const gy21connection = await i2c.openPromisified(1);
			const gy21temp = await gy21connection.readWord(HTU21D_TEMP);
			const gy21humid = await gy21connection.readWord(HTU21D_HUMID);
			await gy21connection.close();
			res.writeHead(200, {'Content-Type': 'text/plain;'});
			res.write(`temp ${gy21temp}`);
			res.write('\n');
			res.end(`humid ${gy21humid}`);
		} catch(e) {
			console.error(e);
			res.writeHead(500, {});
			res.end(e);
		}
		return;
	}
	res.writeHead(404, {});
	res.end('not found');
	
	
})

try {
	server.listen(PORT);
	console.log(`Running on http://${HOST}:${PORT}`);
} catch(e) {
	console.error(e);
}	
