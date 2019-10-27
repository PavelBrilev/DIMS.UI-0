import axios from 'axios';
import {
  USER_ERROR,
  ADD_USER_SUCCESS,
  DELETE_USER_SUCCESS,
} from './ationTypes';

export const addUser = (newUser) => (dispatch) => {
  // add here dispatch signaling avout request starting

  axios
    .post(`${process.env.REACT_APP_BASE_URL}api/member-profile`, newUser)
    .then((response) => {
      dispatch({ type: ADD_USER_SUCCESS, message: response.data });
    })
    .catch((error) => handleUserError(error, dispatch));
};

export const deleteUser = (user) => (dispatch) => {
  axios
    .delete(`${process.env.REACT_APP_BASE_URL}api/member-profile/${user.id}`)
    .then((response) => {
      dispatch({ type: DELETE_USER_SUCCESS, message: response.data });
    })
    .catch((error) => handleUserError(error, dispatch));
};

const handleUserError = (error, dispatch) => {
  if (Array.isArray(error.response && error.response.data)) {
    // bla bla bla
    dispatch({ type: USER_ERROR, errors: error.response.data });
  }
  if (error.response && error.response.data) {
    dispatch({ type: USER_ERROR, errors: error.response.data });
  }
  console.error(`${error.message}`);
  // ADD HANDLE FOR ERRORS!
};
