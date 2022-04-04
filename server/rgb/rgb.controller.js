import {setRGBcolor, setLedDanger, setLedWarn, setLedOff} from './rgb.service.js';

export const rgbController = {
  path: 'rgb',
  handler: async ({searchParams, body: data}) => {
    let success = false;
    if (data && data.state) {
    switch (data.state) {
      case 'alerting':
            if (data.evalMatches?.[0].value > 3000) {
              setLedDanger();
              success = true;
            } else {
              setLedWarn();
              success = true;
            }
            break;
          case 'ok':
              setLedOff();
            success = true;
            break;
        }
      } else if (searchParams.get('red') && searchParams.get('green') && searchParams.get('blue')) {
        setRGBcolor({red: searchParams.get('red'), green: searchParams.get('green'), blue: searchParams.get('blue')});
        return searchParams.toString();;
      } else if (searchParams.get('level')) {
        if (searchParams.get('level') === 'warn') {
          setLedWarn();
        } else if (searchParams.get('level') === 'danger') {
          setLedDanger();
        } else if (searchParams.get('level') === 'safe') {
          setLedOff();
        }
        return searchParams.toString();;
      }
  return {success};

  }
}
