import axios from 'axios';
import {
  USER_ERROR,
  ADD_USER_REQUEST,
  ADD_USER_SUCCESS,
  DELETE_USER_SUCCESS,
  FETCH_USER_REQUEST,
  FETCH_USERS,
  EDIT_USER_SUCCESS,
} from './ationTypes';

export const fetchUsers = () => (dispatch) => {
  dispatch({
    type: FETCH_USER_REQUEST,
    message: 'Request started.',
    isLoading: true,
  });
  axios
    .get(`${process.env.REACT_APP_BASE_URL}api/profiles`)
    .then((response) => {
      dispatch({
        type: FETCH_USERS,
        students: response.data,
        message: 'Data received',
        isLoading: false,
      });
    })
    .catch((error) => handleUserError(error, dispatch));
};

export const addUser = (newUser) => (dispatch) => {
  dispatch({
    type: ADD_USER_REQUEST,
    message: 'Recording started.',
    isLoading: true,
  });
  axios
    .post(`${process.env.REACT_APP_BASE_URL}api/member-profile`, newUser)
    .then((response) => {
      dispatch({
        type: ADD_USER_SUCCESS,
        student: {
          FullName: newUser.Name + ' ' + newUser.LastName,
          Direction: newUser.DirectionId,
          Email: newUser.Email,
          Sex: newUser.Sex,
          Education: newUser.Education,
          BirthDate: newUser.BirthDate,
          UniversityAverageScore: newUser.UniversityAverageScore,
          MathScore: newUser.MathScore,
          Address: newUser.Address,
          MobilePhone: newUser.MobilePhone,
          Skype: newUser.Skype,
          StartDate: newUser.StartDate,
        },
        message: response.data,
        isLoading: false,
      });
    })
    .catch((error) => handleUserError(error, dispatch));
};

export const editUser = (updatedUser) => (dispatch) => {
  axios
    .put(
      `${process.env.REACT_APP_BASE_URL}api/member-profile/${updatedUser.UserId}`,
      updatedUser,
    )
    .then((response) => {
      dispatch({
        type: EDIT_USER_SUCCESS,
        message: 'User was edited',
        updatedUser,
      });
    })
    .catch((error) => handleUserError(error, dispatch));
};

export const deleteUser = (id) => (dispatch) => {
  axios
    .delete(`${process.env.REACT_APP_BASE_URL}api/member-profile/${id}`)
    .then(() => {
      dispatch({
        type: DELETE_USER_SUCCESS,
        message: 'User was deleted',
        id,
      });
    })
    .catch((error) => handleUserError(error, dispatch));
};

const handleUserError = (error, dispatch) => {
  if (
    Array.isArray(error.response && error.response.data) ||
    (error.response && error.response.data)
  ) {
    // bla bla bla
    dispatch({ type: USER_ERROR, errors: error.message });
  }

  // ADD HANDLE FOR ERRORS!
};
