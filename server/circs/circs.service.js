// gy-21p is BMP280 and SI7021
//
// const i2c = require('i2c-bus');

function getTempFromRaw(rawData) {
	if (rawData === 0xffff) return 0;
	return 0.002681 * rawData - 46.85;
}

function getHumidityFromRaw(rawData) {
	if (rawData === 0xffff) return 0;
	return 0.001907 * (rawData ^ 2) - 6;
}

const delay = (t) => new Promise(resolve => {
	setTimeout(() => {
		resolve(true);
	}, t);
});

// gy21
const gy21Controller = async function() {
  const HTU21_ADDRESS = 0x40;
			const HTU21D_TEMP = 0xF3;
			const HTU21D_TEMP_SYNC = 0xE3;
			const writeTempBuf = Buffer.from([HTU21D_TEMP]);
			const readTempBuf = Buffer.alloc(2);
			const HTU21D_HUMID = 0xF5;
			const HTU21D_HUMID_SYNC = 0xE5;
      // const i2c1 = i2c.openSync(1);
			//const gy21connection = await i2c.openPromisified(1);
			// const gy21temp = await gy21connection.readWord(HTU21_ADDRESS, HTU21D_TEMP);
			//const write = await gy21connection.i2cWrite(HTU21_ADDRESS, writeTempBuf.length, writeTempBuf);
			//await delay(100);
			//const read = await gy21connection.i2cRead(HTU21_ADDRESS, readTempBuf.length, readTempBuf);
			// const gy21temp = i2c1.readWordSync(HTU21_ADDRESS, HTU21D_TEMP_SYNC);
			// const gy21humid = i2c1.readWordSync(HTU21_ADDRESS, HTU21D_HUMID_SYNC);
			// console.log('temp raw = ', gy21temp);
			// console.log('humid read = ', gy21humid);
			// const temp =getTempFromRaw(gy21temp); 
			// const humid = getHumidityFromRaw(gy21humid);
			// const gy21humid = await gy21connection.readWord(HTU21_ADDRESS, HTU21D_HUMID);
			// console.log('gy21temp -->',  temp);;
			/// console.log('gy21humid -->', gy21humid);
			// await gy21connection.close();
			// i2c1.closeSync();
			// res.write(`humid ${humid}`);
			// res.write('\n');
			// res.end(`temp ${temp}`);
			return `temp`;
}
// END gy21

