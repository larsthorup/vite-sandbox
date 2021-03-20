import puppeteer from 'puppeteer'
import { createServer } from 'vite'

const PORT = 3001;
const root = '.';

const main = async () => {
  const server = await createServer({
    server: {
      port: PORT,

    },
  }, false);
  await server.listen();

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const address = `http://localhost:${PORT}/test.html`;

  let failureCount = 0;
  try {
    // Note: wait for completion or errors
    failureCount = await new Promise((resolve, reject) => {
      page.on('console', (msg) => {
        if (msg._text.startsWith('mocha:complete:')) {
          const failureCount = parseInt(msg._text.split(':')[2]);
          resolve(failureCount);
        } else {
          console.log.apply(console, msg.args().map((arg) => {
            // Note: this assumes that all the arguments are primitive values
            return arg._remoteObject.value;
          }));
        }
      });
      page.on('requestfailed', (request) => {
        reject(new Error(request.url() + ' ' + request.failure().errorText));
      });
      // page.on('requestfinished', (request) => {
      //   console.log(request.url());
      // });
      page.on('pageerror', ({ message }) => {
        reject(new Error(message));
      });
      page.on('error', (err) => {
        reject(err);
      });
      page.goto(address, { waitUntil: 'domcontentloaded' });
    });
  } finally {
    await browser.close();
    await server.close();
  }
  process.exit(failureCount);
};

main().catch((err) => { throw err; })