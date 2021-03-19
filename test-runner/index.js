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

  page.on('console', (msg) => console.log(msg._text));
  console.log({ address });
  await page.goto(address, { waitUntil: 'domcontentloaded' });
  await browser.close();
  await server.close();
};

main().catch((err) => { throw err; })