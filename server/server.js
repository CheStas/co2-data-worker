import http from 'http';
import { URL } from 'url';
import {co2Module} from './co2/co2.module.js';
import {rgbModule} from './rgb/rgb.module.js';
import {raidSirenaModule} from './raidSirena/raidSirena.module.js';

const PORT = 3000;
const HOST = '0.0.0.0';
const router = {};

initRouter([
  co2Module,
  rgbModule,
  raidSirenaModule,
]);
console.log('initRouter finished', router);

const server = http.createServer(async (req, res) => {
  const {pathname, searchParams} = new URL(req.url, `http://${req.headers.host}`);
  console.info(new Date(), pathname, searchParams.toString());
  let pathToMatch = pathname.toLowerCase();
  if (pathToMatch[pathToMatch.length - 1] === '/') {
    pathToMatch = pathToMatch.substring(0, pathToMatch.length - 1);
  }
  const body = await bodyParser(req);

  if (router[pathToMatch]) {
    try {
      const dataToRerutn = await router[pathToMatch]({searchParams, body});
      if (typeof dataToRerutn === 'string') {
        res.writeHead(200, {'Content-Type': 'text/plain;'});
        res.end(dataToRerutn);
      } else if (typeof dataToRerutn === 'object') {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(dataToRerutn));
      } else {
        res.end(dataToRerutn);
      }

    } catch(e) {
      ErrorHandler(e, res);
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

function ErrorHandler(e, res) {
  console.error(e);
  res.writeHead(500, {});
  res.end("error");
}

function initRouter(modules) {
  for (const module of modules) {
    for (const controller of module.controllers) {
      if (!controller.path || !controller.handler || typeof controller.handler !== 'function') {
        throw new Error('wrong controller type, controller path: ' + controller.path);
      }
      const routerPath = `/${controller.path}`;
      if (router[routerPath]) {
        throw new Error('dubplicated router path ' + routerPath);
      }
      router[routerPath] = controller.handler;
    }
  }
}

async function bodyParser(req) {
  const buffers = [];
  let data;
  try {
    for await (const chunk of req) {
      buffers.push(chunk);
    }
  } catch(e) {
    console.log('get body erro-->', e);
  }
  if (buffers.length) {
    const dataRaw = Buffer.concat(buffers).toString();
    data = JSON.parse(dataRaw);
  }
  return data;
}

