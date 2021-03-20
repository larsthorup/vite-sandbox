import * as path from 'path';

import puppeteer from 'puppeteer'
import { createServer } from 'vite'

// Note: eventually turn into args with default values
const port = 3001;
const root = '.'; // Note: relative to cwd
const entry = 'test.html'; // Note: relative to root
const reporter = 'spec';
// Note: https://mochajs.org/#running-mocha-in-the-browser
const mochaPath = '../node_modules/mocha/mocha.js'; // Note: relative to cwd
const verbose = false;
const debug = false;
// ----

const mochaAbsolutePath = path.resolve(process.cwd(), mochaPath);
const server = await createServer({
  resolve: {
    alias: {
      'mocha': mochaAbsolutePath
    }
  },
  server: {
    port: port,
  },
}, false);
await server.listen();

const browser = await puppeteer.launch();
const page = await browser.newPage();
const address = `http://localhost:${port}/${entry}`;

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
  if (verbose) {
    page.on('requestfinished', (request) => {
      console.log(request.url());
    });
  }
  page.on('pageerror', ({ message }) => {
    throw new Error(message);
  });
  page.on('error', (err) => {
    throw err;
  });
  await page.goto(address, { waitUntil: 'domcontentloaded' });
  const failureCount = await page.evaluate((reporter) => {
    return new Promise((resolve) => {
      mocha.reporter(reporter);
      mocha.run(resolve);
    });
  }, reporter);
  process.exit(failureCount);
} finally {
  await browser.close();
  if (!debug) {
    await server.close();
  }
}
