
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import reducers from './redusers/studentsReduser'
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import storage from './Storage';

const initialStudentsState = storage.getStudents();
const initialTasksState = storage.getTasks();

const initialState = { studentsState: initialStudentsState, tasksState: initialTasksState};
const store = createStore(reducers, initialState);

ReactDOM.render( <Provider store={store}><App/></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

export default store;
