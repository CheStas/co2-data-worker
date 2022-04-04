import {getAirRaidSirenaStatuses, getKyivAirRaidSirenaStatus} from './raidSirena.service.js';
import {setLedDanger, setLedOff} from '../rgb/rgb.service.js';
let kyivAlertPrewState;

export const raidSirenaController = {
  path: 'getkyivairraidsiren',
  handler: async ({searchParams}) => {
    if (searchParams.get('all')) {
      return await getAirRaidSirenaStatuses();
    }
    const kyivStatus = await getKyivAirRaidSirenaStatus();
    const isKyivHasAlert = kyivStatus === 'kyivAlert 1';
    if (isKyivHasAlert && !kyivAlertPrewState) {
      setLedDanger();
    } else if (!isKyivHasAlert && kyivAlertPrewState) {
      setLedOff();
    }
    kyivAlertPrewState = isKyivHasAlert;
    return kyivStatus;
  }
}

