import {red, green, blue} from './rgb.module.js';

export function setLedDanger() {
  red.pwmWrite(255);
  green.pwmWrite(0);
  blue.pwmWrite(0);
}

export function setLedWarn() {
  red.pwmWrite(255);
  green.pwmWrite(50);
  blue.pwmWrite(0);
}

export function setLedOff() {
  red.pwmWrite(0);
  green.pwmWrite(0);
  blue.pwmWrite(0);
}

export function setRGBcolor({red: colorRed, green: colorGreen, blue: colorBlue}) {
  red.pwmWrite(Number(colorRed));
  green.pwmWrite(Number(colorGreen));
  blue.pwmWrite(Number(colorBlue));
}
