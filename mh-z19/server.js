const http = require('http');
const url = require('url');
const MHZ19B = require('mh-z19b');

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
