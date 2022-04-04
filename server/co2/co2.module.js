import MHZ19B from 'mh-z19b';
import {co2Controller, co2MainController} from './co2.controller.js';

export let mhz19b;

export const co2Module = {
  controllers: [co2Controller, co2MainController],
}

function initMHZ19B() {
  mhz19b = new MHZ19B('/dev/ttyS0');
  mhz19b.abcOff();
  console.log('mhz19b init end');
}

try {
  initMHZ19B();
} catch(e) {
  console.error('initMHZ19B error',e);
}
