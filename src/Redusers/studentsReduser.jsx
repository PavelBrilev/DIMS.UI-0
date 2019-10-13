import { combineReducers } from 'redux';
import storage from '../Storage';

const initialStudentsState = storage.getStudents();
const initialTasksState = storage.getTasks();

 const studentsReduser = (state = initialStudentsState, action) => {
    switch (action.type) {
        case 'USER_LIST_SUCCESS': 
            return [...state, [action.allStudents]]
        default: return state;
    }
}

  function tasksReduser(state = initialTasksState, action) {
    switch (action.type) {
        case 'TASKS_LIST_SUCCESS': 
            return [...state, [action.allTasks]]
        default: return state;
    }
  }

  const reducers = combineReducers({
    studentsState: studentsReduser,
    tasksState: tasksReduser
  });

export default reducers;