import React from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import StudentsForm from '../forms/StudentsForm';
import DeleteForm from '../forms/DeleteForm';
import { Consumer } from '../../App';
import Popup from '../popup/Popup';
import { icons } from '../common/icons';
import { addStudent, addStudents } from '../../redusers/actions';

import '../../styles/styles.css';

class AllStudents extends React.Component {
  componentDidMount() {
    const { students, dispatch } = this.props;
    if (!students.length) {
      return dispatch(addStudents());
    }
  }

  render() {
    const { students, dispatch } = this.props;
    if (!students || !students.length) {
      return (
        <div className='container'>
          <Popup
            className='btn btn-outline-primary btn-block'
            icon={icons.create}
            name='Register'
          >
            <StudentsForm setNewStudent={dispatch(addStudent)} />
          </Popup>
          <p className='text'>No registered</p>
        </div>
      );
    }

    const listItems = students.map((student) => (
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
            {`${icons.progressIcon} Progress`}
          </Link>
          <Link
            key={`${student.id}-2`}
            className='btn btn-outline-primary'
            to={{ pathname: `/students/${student.id}/tasks` }}
          >
            {`${icons.tasksIcon} Tasks`}
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
              id={student.UserId}
              name={student.FullName}
            />
          </Popup>
        </td>
      </tr>
    ));

    return (
      <div className='container'>
        <Popup
          className='btn btn-outline-primary'
          icon={icons.create}
          name='Register'
        >
          <StudentsForm
            setNewStudent={(data) => {
              dispatch(addStudent(data));
            }}
          />
        </Popup>
        <Consumer>
          {(theme) => (
            <Table hover id={`${theme}`}>
              <thead>
                <tr>
                  <th>№</th>
                  <th>Full Name</th>
                  <th>Direction</th>
                  <th>Education</th>
                  <th>Start</th>
                  <th>Age</th>
                  <th />
                </tr>
              </thead>
              <tbody>{listItems}</tbody>
            </Table>
          )}
        </Consumer>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  students: state.studentsState.students,
  message: state.studentsState.message,
  errors: state.studentsState.errors,
});

export default connect(
  mapStateToProps
)(AllStudents);

AllStudents.propTypes = {
  students: PropTypes.arrayOf(
            PropTypes.shape({
              FullName: PropTypes.string,
              Direction: PropTypes.string,
              Education: PropTypes.string,
              StartDate: PropTypes.string,
              Age: PropTypes.number })),
  addStudent: PropTypes.func,
  delStudent: PropTypes.func,
  editStudent: PropTypes.func,
};
