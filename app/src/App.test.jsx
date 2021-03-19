import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

const ok = (actual, message) => {
  if (!actual) {
    throw new Error(`Expected a value instead of "${actual}": ${message}`);
  }
}

(() => {
  render(<App />);
  screen.getByText('Hello Vite + React!');
  const countButton = screen.getByText('count is: 0');
  countButton.click();
  screen.getByText('count is: 1');
  console.log('√ App')
})();
