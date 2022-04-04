import {mhz19b} from './co2.module.js';

export const co2MainController = {
  path: 'co2',
  handler: async () => {
    const co2res = await mhz19b.readCO2();
    return `co2 ${co2res.co2}\ntemp ${co2res.temperature}`;
  }
}

export const co2Controller = {
  path: 'co2/all',
  handler: async () => {
    return await mhz19b.readCO2();
  }
}
