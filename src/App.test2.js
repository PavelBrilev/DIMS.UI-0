import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { render } from '@testing-library/react';
import App from './App';
import reducers, { studentsInitilState } from './reducers/index';

function renderWithRedux(
  ui,
  {
    initialState,
    store = createStore(reducers, initialState, applyMiddleware(thunk)),
  } = {},
) {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store,
  };
}

describe('<App/>', () => {
  it('Renders without crashing', () => {
    const { getByText } = renderWithRedux(<App />);
    expect(getByText('DIMS React App')).toBeInTheDocument();
  });
});
