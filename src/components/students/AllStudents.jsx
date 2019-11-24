import React from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'reactstrap';
import AlertMessage from '../common/alert';
import AlertErrors from '../common/alertErrors';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import StudentsForm from '../common/forms/students-form/StudentsForm';
import DeleteForm from '../common/forms/delete-form/DeleteForm';
import Popup from '../popup/Popup';
import { icons } from '../common/icons';
import { addUser, fetchUsers, editUser } from '../../reducers/studentsActions';
import Thead from './Thead';
import Tbody from './Tbody';
import { ThemeContext } from '../../context/ThemeContext';
import Loader from '../common/loader/spinner';

import '../../styles/styles.css';

class AllStudents extends React.PureComponent {
  componentDidMount() {
    const { students, dispatch } = this.props;
    if (!students.length) {
      return dispatch(fetchUsers());
    }
  }

  componentDidUpdate(prevProps) {
    //   const { students, dispatch } = this.props;
    //   //below we need some library fo deep checking
    //   if (prevProps.students !== students) {
    //     return dispatch(fetchUsers());
    //   }
  }

  editUser = () => (data) => this.props.dispatch(editUser(data));

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
            {icons.progressIcon} Progress
          </Link>
          <Link
            key={`${student.id}-2`}
            className='btn btn-outline-primary'
            to={{ pathname: `/students/${student.id}/tasks` }}
          >
            {icons.tasksIcon} Tasks
          </Link>
          <Popup
            key={`${student.id}-3`}
            className='btn btn-outline-primary'
            icon={icons.editIcon}
            name='Edit'
          >
            <StudentsForm setNewState={this.editUSer} student={student} />
          </Popup>
          <Popup
            className='btn btn-outline-danger'
            icon={icons.deleteIcon}
            name='Delete'
            key={`${student.id}-4`}
          >
            <DeleteForm
              type='students'
              id={student.UserId}
              name={student.FullName}
            />
          </Popup>
        </td>
      </tr>
    ));
  };

  addStudent = () => (data) => {
    this.props.dispatch(addUser(data));
  };

  createPopUpForm = () => {
    return (
      <Popup
        className='btn btn-outline-primary btn-block'
        icon={icons.create}
        name='Register'
      >
        <StudentsForm setNewStudent={this.addStudent()} />
      </Popup>
    );
  };

  render() {
    const { Consumer } = ThemeContext;
    const { students, isLoading } = this.props;

    if (isLoading) {
      return (
        <div className='container'>
          {this.createPopUpForm()}
          <Loader />
        </div>
      );
    }

    if (!students || !students.length) {
      return (
        <div className='container'>
          {this.createPopUpForm()}
          <p className='text'>No students</p>
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
        <AlertMessage message={this.props.message} />
        <AlertErrors errors={this.props.errors} />
      </div>
    );
  }
}

const mapStateToProps = ({ studentsState }) => ({
  students: studentsState.students,
  message: studentsState.message,
  errors: studentsState.errors,
  isLoading: studentsState.isLoading,
});

export default connect(mapStateToProps)(AllStudents);

AllStudents.propTypes = {
  students: PropTypes.arrayOf(
    PropTypes.shape({
      FullName: PropTypes.string,
      Direction: PropTypes.string,
      Education: PropTypes.string,
      StartDate: PropTypes.string,
      Age: PropTypes.number,
    }),
  ),
  addStudent: PropTypes.func,
  delStudent: PropTypes.func,
  editStudent: PropTypes.func,
};

AllStudents.defaultProps = {
  students: [],
  deleteUser: () => {},
  editStudent: () => {},
};
