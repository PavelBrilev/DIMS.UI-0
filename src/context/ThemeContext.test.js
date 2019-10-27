import React from 'react';
import { render } from '@testing-library/react';
import {
  ThemeContext,
  ThemeConsumer,
  ThemeProvider,
} from '../../context/ThemeContext';

/**
 * Test default values by rendering a context consumer without a
 * matching provider
 */
test('ThemeConsumer shows default value', () => {
  const { getByText } = render(<ThemeConsumer />);
  expect(getByText(/^Color is:/)).toHaveTextContent('Color is: Unknown');
});

/**
 * To test a component tree that uses a context consumer but not the provider,
 * wrap the tree with a matching provider
 */
test('ThemeConsumer shows value from provider', () => {
  const { getByText } = render(
    <ThemeContext.Provider value='white'>
      <ThemeConsumer />
    </ThemeContext.Provider>,
  );
  expect(getByText(/^Color is:/)).toHaveTextContent('Color Is: white');
});

/**
 * To test a component that provides a context value, render a matching
 * consumer as the child
 */
test('ThemeProvider color', () => {
  const { getByText } = render(
    <ThemeProvider color='yellow'>
      <ThemeContext.Consumer>
        {(value) => <span>Expected: {value}</span>}
      </ThemeContext.Consumer>
    </ThemeProvider>,
  );
  expect(getByText(/^Expected:/).textContent).toBe('Expected: yellow');
});

/**
 * A tree containing both a providers and consumer can be rendered normally
 */
test('NameProvider/Consumer shows name of character', () => {
  const { getByText } = render(
    <ThemeProvider color='red'>
      <ThemeConsumer />
    </ThemeProvider>,
  );
  expect(getByText(/^My color is:/).textContent).toBe('My color is: red');
});
