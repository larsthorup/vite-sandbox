# vite-sandbox

[![Build Status](https://api.travis-ci.com/larsthorup/vite-sandbox.svg)](https://travis-ci.com/github/larsthorup/vite-sandbox)

This repo demonstrates how to create a web front-end project using various tools providing useful benefits:

- [Vite](https://vitejs.dev/) as bundler and live dev server (speed)
- [Mocha](https://mochajs.org/) as test runner (flexibility)
- [Puppeteer](https://pptr.dev/) as test browser (robustness)
- [Testing Library](https://testing-library.com/) for UI testing (black box testing)
- [React](https://reactjs.org/) as rendering engine (productivity)
- npm [workspaces]() and this mono-repo for versioning and dependency management (simplicity)

```bash
npm install
npm test
npm run dev
npm run build
```

Note: this project was scaffolded with:

```bash
npm init @vitejs/app app -- --template react
```
