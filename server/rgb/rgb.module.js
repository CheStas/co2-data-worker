import {rgbController} from './rgb.controller.js';
import pigpio from 'pigpio';
const Gpio = pigpio.Gpio;
process.on('SIGHUP', shutdown);
process.on('SIGINT', shutdown);
process.on('SIGCONT', shutdown);
process.on('SIGTERM', shutdown);

export const rgbModule = {
  controllers: [rgbController],
}
export let red, green, blue;

try {
  initRGBpigpio();
} catch(e) {
  console.error('init pigpio error, cancel and try again', e);
  pigpio.terminate();
  setTimeout(() => {
   initRGBpigpio();
  }, 1000);
}

function initRGBpigpio() {
  red = new Gpio(12, {mode: Gpio.OUTPUT});
  green = new Gpio(18, {mode: Gpio.OUTPUT});
  blue = new Gpio(13, {mode: Gpio.OUTPUT});
  red.pwmWrite(100);
  green.pwmWrite(100);
  blue.pwmWrite(100);
}

function shutdown() {
  pigpio.terminate();
  console.log('raspi2-brownout-watcher must exit, performed cleanup.');
  setTimeout(() => {
    process.exit(0);
  }, 500);
}

