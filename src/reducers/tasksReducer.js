import {
  FETCH_TASKS_REQUEST,
  ADD_TASK_REQUEST,
  ADD_TASK_SUCCESS,
  EDIT_TASK_SUCCESS,
  FETCH_TASKS,
  DELETE_TASK_SUCCESS,
  TASK_ERROR,
} from './ationTypes';

export const tasksInitialState = {
  tasks: [],
  errors: '',
  message: '',
  isLoading: false,
};

export const tasksReduser = (state = tasksInitialState, action) => {
  switch (action.type) {
    case FETCH_TASKS_REQUEST:
      return { ...state, message: action.message, isLoading: action.isLoading };
    case FETCH_TASKS:
      return {
        ...state,
        tasks: [...action.tasks],
        isLoading: action.isLoading,
        message: action.message,
      };
    case ADD_TASK_REQUEST:
      return {
        ...state,
        message: action.message,
        isLoading: action.isLoading,
      };
    case ADD_TASK_SUCCESS:
      return {
        ...state,
        tasks: [...state.tasks, action.newTask],
        message: action.message,
        isLoading: action.isLoading,
      };
    case DELETE_TASK_SUCCESS:
      return {
        ...state,
        ...state.tasks.filter((item) => item.TaskId !== action.id),
        message: action.message,
      };
    case EDIT_TASK_SUCCESS:
      return {
        ...state,
        message: action.message,
      };
    case TASK_ERROR:
      return {
        ...state,
        errors: action.errors,
      };
    default:
      return state;
  }
};
