import axios from 'axios';
import { ADD_USER } from './ationTypes';

export const addStudent = (newStudent) => (dispatch) => {
  axios
    .post(`${process.env.REACT_APP_BASE_URL}api/member-profile`, newStudent)
    .then((response) => {
      dispatch({ type: ADD_USER, students: response.data });
    })
    .catch((error) => {
      if (Array.isArray(error.response && error.response.data)) {
        // bla bla bla
      }
      if (error.response && error.response.data) {
        console.log(error.response.data);
      }
      console.log(`${error.message}`);
      // ADD HANDLE FOR ERRORS!
    });
};
