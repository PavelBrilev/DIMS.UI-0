import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render } from '@testing-library/react';
import App from './App';

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('<App/>', () => {
  it('Renders without crashing', () => {
    const initialState = {
      /*expected state goes here */
    };
    const store = mockStore(initialState);

    const { getByText } = render(
      <Provider store={store}>
        <App />
      </Provider>,
    );
    expect(getByText('DIMS React App')).toBeInTheDocument();
  });
});
