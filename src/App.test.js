import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
// import configureStore from 'redux-mock-store';
import { render } from '@testing-library/react';
import App from './App';
import reducers, { studentsInitilState } from './reducers/index';

// const initialState = {
//   /*expected state goes here */
// };
// const middlewares = [];
// const mockedStore = createStore();

// this is a handy function that I normally make available for all my tests
// that deal with connected components.
// you can provide initialState for the entire store that the ui is rendered with
function renderWithRedux(
  ui,
  { initialState, store = createStore(reducers, initialState) } = {},
) {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    // adding `store` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    store,
  };
}

describe('<App/>', () => {
  it('Renders without crashing', () => {
    const { getByText } = renderWithRedux(<App />);
    expect(getByText('DIMS React App')).toBeInTheDocument();
  });
});
