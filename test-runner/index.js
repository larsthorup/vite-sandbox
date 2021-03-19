import puppeteer from 'puppeteer'
import { createServer } from 'vite'

const PORT = 3001;

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
    console.log(msg._text);
  });
  page.on('pageerror', ({ message }) => {
    console.error(message);
  });
  await page.goto(address, { waitUntil: 'domcontentloaded' });
  await browser.close();
  // TODO: wait until tests have completed
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  await server.close();
};

main().catch((err) => { throw err; })