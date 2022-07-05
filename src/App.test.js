import React from 'react';
import { fireEvent, screen, render, waitFor } from './test-utils'
import App from './App';

test('renders App', () => {
  render(<App />);
});
