import axios from 'axios';
import { ADD_USER_ERROR, ADD_USER_SUCCESS } from './ationTypes';

export const addStudent = (newStudent) => (dispatch) => {
  // dispatch for starting request

  axios
    .post(`${process.env.REACT_APP_BASE_URL}api/member-profile`, newStudent)
    .then((response) => {
      dispatch({ type: ADD_USER_SUCCESS, message: response.data });
    })
    .catch((error) => {
      if (Array.isArray(error.response && error.response.data)) {
        // bla bla bla
        dispatch({ type: ADD_USER_ERROR, errors: error.response.data });
      }
      if (error.response && error.response.data) {
        dispatch({ type: ADD_USER_ERROR, errors: error.response.data });
      }
      console.error(`${error.message}`);
      // ADD HANDLE FOR ERRORS!
    });
};
