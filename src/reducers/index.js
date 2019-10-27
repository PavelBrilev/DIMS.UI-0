import { combineReducers } from 'redux';
import { studentsReduser } from './studentsReducer';
// import tasksReduser from './tasksReduser';

const reducer = combineReducers({
  studentsState: studentsReduser,
  // tasksState: tasksReduser
});

export default reducer;
