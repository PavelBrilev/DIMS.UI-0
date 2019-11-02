import {
  ADD_TASK_REQUEST,
  ADD_TASK_SUCCESS,
  EDIT_TASK_SUCCESS,
  FETCH_TASKS,
  DELETE_TASK_SUCCESS,
} from './ationTypes';

export const tasksInitialState = { tasks: [], errors: [], message: '' };

export const tasksReduser = (state = tasksInitialState, action) => {
  switch (action.type) {
    case FETCH_TASKS:
      return { ...state, tasks: [...action.tasks] };
    case ADD_TASK_REQUEST:
      return {
        ...state,
        message: action.message,
      };
    case ADD_TASK_SUCCESS:
      return {
        ...state,
        message: action.message,
      };
    case DELETE_TASK_SUCCESS:
      return {
        ...state,
        message: action.message,
      };
    case EDIT_TASK_SUCCESS:
      return {
        ...state,
        message: action.message,
      };

    default:
      return state;
  }
};
