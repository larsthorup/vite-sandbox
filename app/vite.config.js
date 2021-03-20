import * as path from 'path';
import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'

export default defineConfig({
  plugins: [reactRefresh()],
  resolve: {
    alias: {
      // Note: https://mochajs.org/#running-mocha-in-the-browser
      'mocha': path.resolve(__dirname, '../node_modules/mocha/mocha.js')
    }
  }
})
