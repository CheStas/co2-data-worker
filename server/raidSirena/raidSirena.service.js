import https from 'https';
const externalApiURL = 'https://war-api.ukrzen.in.ua/alerts/api/alerts/active.json';
// const apiUrl2 = 'https://fra1.digitaloceanspaces.com/emapa/statuses.json?t=DATE HEREEEE';

export function getAirRaidSirenaStatuses() {
  return new Promise((resolve, reject) => {
    const request = https.get(externalApiURL, {timeout: 5000}, (externalResponse) => {
      const { statusCode } = externalResponse;
      const contentType = externalResponse.headers['content-type'];
      if (statusCode !== 200) {
        reject(`wrong statusCode ${statusCode}, ${contentType}`);
        return;
      }
      let data = '';
      externalResponse.on('data', chunk => {
        data += chunk;
      });
      externalResponse.on('end', () => {
        resolve(JSON.parse(data));
      });
    });

    request.on('timeout', () => {
      request.destroy();
      reject('timeoutError');
    });

    request.on('error', err => {
      if (request.destroyed) return;
      reject(err);
    })
  });
}

export async function getKyivAirRaidSirenaStatus() {
  const kyivname = "м. Київ";
  const newAlertStates = await getAirRaidSirenaStatuses();
  const KyivAlert = newAlertStates.alerts?.find(el => el.location_title === kyivname && el.location_type === 'city');
  const isKyivHasAlert = !!KyivAlert?.id;
  return `kyivAlert ${Number(isKyivHasAlert)}`;

}
