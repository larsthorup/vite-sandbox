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

  page.on('console', (msg) => {
    console.log.apply(console, msg.args().map((arg) => {
      // Note: this assumes that all the arguments are primitive values
      return arg._remoteObject.value;
    }));
  });
  page.on('requestfailed', (request) => {
    console.error(request.url() + ' ' + request.failure().errorText);
  });
  // page.on('requestfinished', (request) => {
  //   console.log(request.url());
  // });
  page.on('pageerror', ({ message }) => {
    console.error(message);
  });
  page.on('error', (err) => {
    console.error(err);
  });
  await page.goto(address, { waitUntil: 'domcontentloaded' });
  // TODO: wait until tests have completed
  await new Promise((resolve) => setTimeout(resolve, 3000));
  await browser.close();
  await server.close();
};

main().catch((err) => { throw err; })