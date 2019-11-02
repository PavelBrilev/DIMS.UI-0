import axios from 'axios';
import {
  TASK_ERROR,
  ADD_TASK_REQUEST,
  ADD_TASK_SUCCESS,
  DELETE_TASK_SUCCESS,
  FETCH_TASKS,
  EDIT_TASK_SUCCESS,
} from './ationTypes';

export const fetchTasks = () => (dispatch) => {
  axios
    .get(`${process.env.REACT_APP_BASE_URL}api/tasks`)
    .then((response) => {
      dispatch({ type: FETCH_TASKS, tasks: response.data });
    })
    .catch((error) => handleTaskError(error, dispatch));
};

export const addTask = (newTask) => (dispatch) => {
  dispatch({ type: ADD_TASK_REQUEST, message: 'Recording started...' });
  axios
    .post(`${process.env.REACT_APP_BASE_URL}api/task`, newTask)
    .then((response) => {
      dispatch({
        type: ADD_TASK_SUCCESS,
        message: response.data,
      });
      dispatch(fetchTasks());
    })
    .catch((error) => handleTaskError(error, dispatch));
};

export const editTask = (updatedUser) => (dispatch) => {
  console.log(updatedUser);
  axios
    .put(
      `${process.env.REACT_APP_BASE_URL}api/member-profile/${updatedUser.UserId}`,
      updatedUser,
    )
    .then((response) => {
      console.log(response.data);
      dispatch({ type: EDIT_TASK_SUCCESS, message: 'Task was edited' });
    })
    .catch((error) => handleTaskError(error, dispatch));
};

export const deleteTask = (id) => (dispatch) => {
  axios
    .delete(`${process.env.REACT_APP_BASE_URL}api/member-profile/${id}`)
    .then((response) => {
      dispatch({ type: DELETE_TASK_SUCCESS, message: 'Task was deleted' });
      dispatch(fetchTasks());
    })
    .catch((error) => handleTaskError(error, dispatch));
};

const handleTaskError = (error, dispatch) => {
  if (Array.isArray(error.response && error.response.data)) {
    // bla bla bla
    dispatch({ type: TASK_ERROR, errors: error.response.data });
  }
  if (error.response && error.response.data) {
    dispatch({ type: TASK_ERROR, errors: error.response.data });
  }
  console.error(`${error.message}`);
  // ADD HANDLE FOR ERRORS!
};
