import { combineReducers } from 'redux';
import {
  ADD_USER,
  FETCH_USERS,
  DELETE_USER,
  ADD_USER_SUCCESS,
} from './ationTypes';

export const studentsInitialState = { students: [], errors: [], message: '' };

const studentsReduser = (state = studentsInitialState, action) => {
  switch (action.type) {
    case FETCH_USERS:
      return { ...state, students: [...state.students, ...action.students] };
    case ADD_USER:
      return [...state, [...state.students, action.student]];
    case DELETE_USER:
      return state.filter((item) => item.id !== action.studentId);

    case 'EDIT_USER':
      return state.map((item) => {
        if (item.id === action.updatedStudent.id) {
          item = action.updatedStudent;
        }
        return item;
      });

    case ADD_USER_SUCCESS:
      return { ...state, message: action.message };

    default:
      return state;
  }
};

const reducers = combineReducers({
  studentsState: studentsReduser,
  // tasksState: tasksReduser
});

export default reducers;

// it is for AllTasks with REDUX

// const initTasksState = storage.getTasks()

//   function tasksReduser(state = initTasksState, action) {
//     switch (action.type) {
//         case 'ADD_TASK':
//             return [...state, action.task]
//         case 'DEL_TASK':
//             return state.filter((item) => item.id !== action.taskId);
//         case 'EDIT_TASK':
//           return state.map(item => {
//             if(item.id === action.updatedTask.id)
//               {item = action.updatedTask}
//               return item;
//             });
//         default: return state;
//     }
//   }

// const mapStateToProps = (state) => {
//   return {
//     tasks: state.tasksState
//   };
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     addTasks: (task) => {
//       dispatch({
//         type: 'ADD_TASK',
//         task: task
//       });
//     },
//     delTasks: (taskId) => {
//       dispatch({
//         type: 'DEL_TASK',
//         taskId: taskId
//       });
//     },
//     editTasks: (updatedTask) => {
//       dispatch({
//         type: 'EDIT_TASK',
//         updatedTask: updatedTask
//       });
//     }
//   }
// }
