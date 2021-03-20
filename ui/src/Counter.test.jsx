import { expect } from 'chai';
import React from 'react';
import { render, screen } from '@testing-library/react';

import Counter from './Counter';

describe('Counter', () => {
  it('should count', () => {
    render(<Counter />);
    const countButton = screen.getByText('count is: 0');
    countButton.click();
    screen.getByText('count is: 1');
  });
});
