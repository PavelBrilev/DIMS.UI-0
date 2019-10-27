import {
  ADD_USER,
  FETCH_USERS,
  DELETE_USER,
  ADD_USER_SUCCESS,
} from './ationTypes';

export const studentsInitialState = { students: [], errors: [], message: '' };

export const studentsReduser = (state = studentsInitialState, action) => {
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
