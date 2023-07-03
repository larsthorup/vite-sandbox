import { expect } from 'chai';
import React from 'react';
import { render, screen } from '@testing-library/react';

import Counter from './Counter';

describe('Counter', () => {
  it('should count', async () => {
    render(<Counter />);
    const countButton = screen.getByText('count is: 0');
    countButton.click();
    await screen.findByText('count is: 1');
  });
});
