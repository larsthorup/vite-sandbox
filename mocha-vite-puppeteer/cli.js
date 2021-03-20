import * as path from 'path';
import * as url from 'url';

import puppeteer from 'puppeteer'
import { createServer } from 'vite'

const PORT = 3001;
const root = '.';
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const main = async () => {
  const server = await createServer({
    resolve: {
      alias: {
        // Note: https://mochajs.org/#running-mocha-in-the-browser
        'mocha': path.resolve(__dirname, '../node_modules/mocha/mocha.js')
      }
    },
    server: {
      port: PORT,
    },
  }, false);
  await server.listen();

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const address = `http://localhost:${PORT}/test.html`;

  try {
    page.on('console', (msg) => {
      console.log.apply(console, msg.args().map((arg) => {
        // Note: this assumes that all the arguments are primitive values
        return arg._remoteObject.value;
      }));
    });
    page.on('requestfailed', (request) => {
      throw new Error(request.url() + ' ' + request.failure().errorText);
    });
    // page.on('requestfinished', (request) => {
    //   console.log(request.url());
    // });
    page.on('pageerror', ({ message }) => {
      throw new Error(message);
    });
    page.on('error', (err) => {
      throw err;
    });
    await page.goto(address, { waitUntil: 'domcontentloaded' });
    const failureCount = await page.evaluate(() => {
      return new Promise((resolve) => mocha.run(resolve));
    });
    process.exit(failureCount);
  } finally {
    await browser.close();
    await server.close();
  }
};

main().catch((err) => { throw err; })