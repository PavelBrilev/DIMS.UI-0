import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Table } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import StudentsForm from '../common/forms/students-form/StudentsForm';
import DeleteForm from '../common/forms/delete-form/DeleteForm';
import { Consumer } from '../../App';
import Popup from '../popup/Popup';
import { icons } from '../common/icons';
import { addUser, deleteUser } from '../../reducers/actions';
import { FETCH_USERS, DELETE_USER } from '../../reducers/ationTypes';
import Thead from './Thead';
import Tbody from './Tbody';

import '../../styles/styles.css';

class AllStudents extends React.Component {
  componentDidMount() {
    if (!this.props.students.length) {
      this.props.addStudents();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // this.props.addStudents();
    // below we need some library fo deep checking
    if (this.props.students !== prevProps.students) {
      // add students to store here
    }
  }

  listItems = (students) => {
    return students.map((student) => (
      <tr key={students.indexOf(student)}>
        <td>{students.indexOf(student) + 1}</td>
        <td>{student.FullName}</td>
        <td>{student.Direction}</td>
        <td>{student.Education}</td>
        <td>{student.StartDate}</td>
        <td>{student.Age}</td>
        <td>
          <Link
            key={`${student.id}-1`}
            className='btn btn-outline-primary'
            to={{ pathname: `/students/${student.id}/doneTasks` }}
          >
            {icons.progressIcon}
            Progress
          </Link>
          <Link
            key={`${student.id}-2`}
            className='btn btn-outline-primary'
            to={{ pathname: `/students/${student.id}/tasks` }}
          >
            {icons.tasksIcon}
            Tasks
          </Link>
          <Popup
            key={`${student.id}-3`}
            className='btn btn-outline-primary'
            icon={icons.editIcon}
            name='Edit'
          >
            <StudentsForm
              setNewStudent={this.props.editStudent}
              id={student.UserId}
            />
          </Popup>
          <Popup
            className='btn btn-outline-danger'
            icon={icons.deleteIcon}
            name='Delete'
            id={student.id}
            key={`${student.id}-4`}
          >
            <DeleteForm
              type='students'
              setNewState={this.props.deleteStudent}
              id={student.UserId}
              name={student.FullName}
            />
          </Popup>
        </td>
      </tr>
    ));
  };

  createPopUpForm = () => {
    return (
      <Popup
        className='btn btn-outline-primary btn-block'
        icon={icons.create}
        name='Register'
      >
        <StudentsForm
          setNewStudent={(data) => this.props.dispatch(addUser(data))}
        />
      </Popup>
    );
  };

  render() {
    const { students } = this.props;

    if (!students || !students.length) {
      return (
        <div className='container'>
          {this.createPopUpForm()}
          <p className='text'>No registered</p>
        </div>
      );
    }

    return (
      <div className='container'>
        {this.createPopUpForm()}
        <Consumer>
          {(theme) => (
            <Table hover id={`${theme}`}>
              <Thead />
              <Tbody>{this.listItems(students)}</Tbody>
            </Table>
          )}
        </Consumer>
      </div>
    );
  }
}

const mapStateToProps = ({ studentsState }) => ({
  students: studentsState.students,
  message: studentsState.message,
  errors: studentsState.errors,
});

const mapDispatchToProps = (dispatch) => ({
  addStudents: () => {
    const asyncGetStudents = () => {
      return (dispatch) => {
        axios
          .get(`${process.env.REACT_APP_BASE_URL}api/profiles`)
          .then((response) => {
            dispatch({ type: FETCH_USERS, students: response.data });
          })
          .catch((error) => {
            if (error.response && error.response.data) {
              console.log(error.response.data.ExceptionMessage);
            }
            console.log(`${error.message}`);
          });
      };
    };
    dispatch(asyncGetStudents());
  },
  deleteStudent: (id) => {
    dispatch(
      deleteUser({
        type: DELETE_USER,
        id,
      }),
    );
  },
  editStudent: (updatedStudent) => {
    dispatch({
      type: 'EDIT_USER',
      updatedStudent: updatedStudent,
    });
  },
  dispatch,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AllStudents);

AllStudents.propTypes = {
  students: PropTypes.array,
  deleteUser: PropTypes.func,
  editStudent: PropTypes.func,
};

AllStudents.defaultProps = {
  students: [],
  deleteUser: () => {},
  editStudent: () => {},
};
