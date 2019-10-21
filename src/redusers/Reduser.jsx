import { combineReducers } from 'redux';
import storage from '../Storage';

 const studentsReduser = (state = [], action) => {
    switch (action.type) {
        case 'ADD_ALL_USERS': 
            return state.concat(action.students);
        case 'ADD_USER': 
            return [...state, action.student]
        case 'DEL_USER': 
            return state.filter((item) => item.id !== action.studentId);
        case 'EDIT_USER': 
            return state.map(item => {
              if(item.id === action.updatedStudent.id) 
                {item = action.updatedStudent}
                 return item;
              });
        default: return state;
    }
}

const initTasksState = storage.getTasks()

  function tasksReduser(state = initTasksState, action) {
    switch (action.type) {
        case 'ADD_TASK': 
            return [...state, action.task]
        case 'DEL_TASK': 
            return state.filter((item) => item.id !== action.taskId);
        case 'EDIT_TASK': 
          return state.map(item => {
            if(item.id === action.updatedTask.id) 
              {item = action.updatedTask}
              return item;
            });
        default: return state;
    }
  }

  const reducers = combineReducers({
    studentsState: studentsReduser,
    tasksState: tasksReduser
  });

export default reducers;