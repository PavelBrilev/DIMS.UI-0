import {
  ADD_USER_REQUEST,
  ADD_USER_SUCCESS,
  EDIT_USER_SUCCESS,
  FETCH_USERS,
  DELETE_USER_SUCCESS,
} from './ationTypes';

export const studentsInitialState = { students: [], errors: [], message: '' };

export const studentsReduser = (state = studentsInitialState, action) => {
  switch (action.type) {
    case FETCH_USERS:
      return { ...state, students: [...action.students] };
    case ADD_USER_REQUEST:
      return {
        ...state,
        message: action.message,
      };
    case ADD_USER_SUCCESS:
      return {
        ...state,
        message: action.message,
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
