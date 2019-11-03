import {
  ADD_USER_REQUEST,
  ADD_USER_SUCCESS,
  EDIT_USER_SUCCESS,
  FETCH_USER_REQUEST,
  FETCH_USERS,
  DELETE_USER_SUCCESS,
} from './ationTypes';

export const studentsInitialState = {
  students: [],
  errors: [],
  message: '',
  isLoading: false,
};

export const studentsReduser = (state = studentsInitialState, action) => {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return { ...state, message: action.message, isLoading: action.isLoading };
    case FETCH_USERS:
      return {
        ...state,
        students: [...action.students],
        isLoading: action.isLoading,
        message: action.message,
      };
    case ADD_USER_REQUEST:
      return {
        ...state,
        message: action.message,
        isLoading: action.isLoading,
      };
    case ADD_USER_SUCCESS:
      return {
        ...state,
        message: action.message,
        isLoading: action.isLoading,
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        message: action.message,
      };
    case EDIT_USER_SUCCESS:
      return {
        ...state,
        message: action.message,
      };

    default:
      return state;
  }
};
