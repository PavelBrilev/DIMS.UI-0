import { combineReducers } from 'redux';

 const studentsReduser = (state = [], action) => {
    switch (action.type) {
        case 'ADD_USER': 
            return [...state, action.student]
        default: return state;
    }
}

  function tasksReduser(state = [], action) {
    switch (action.type) {
        case 'ADD_TASK': 
            return [...state, action.task]
        default: return state;
    }
  }

  const reducers = combineReducers({
    studentsState: studentsReduser,
    tasksState: tasksReduser
  });

export default reducers;