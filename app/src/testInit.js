// Note: https://mochajs.org/#running-mocha-in-the-browser
import 'mocha';

mocha.setup({
  reporter: 'spec',
  ui: 'bdd',
});