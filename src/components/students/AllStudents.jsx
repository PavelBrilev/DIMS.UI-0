import React from 'react';
import Popup from '../popup/Popup';
import StudentsForm from '../forms/StudentsForm';
import DeleteForm from '../forms/DeleteForm';
import { Link } from "react-router-dom";
import '../../styles/styles.css';
import { Table } from 'reactstrap';
import { Consumer } from '../../App';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

class AllStudents extends React.Component {

  render() {
    const students = this.props.students;
    if (!students || students.length === 0) {
      return (
        <div className='container'>
          <Popup
            className='btn btn-outline-primary btn-block'
            name='Register'>
            <StudentsForm setNewStudent={this.props.addStudent} />
          </Popup>
            <p className='text'>No registered</p>
        </div>
      );
    } 

    const listItems = students.map(student => {
      return (
        <tr key={students.indexOf(student)}>
          <td >{students.indexOf(student)+1}</td>
          <td >{student.name + ' ' + student.lastName} </td>
          <td >{student.direction} </td>
          <td >{student.education} </td>
          <td >{student.start} </td>
          <td >{student.age} </td>
          <td >
            <Link 
              key={`${student.id}-1`}
              className="btn btn-outline-primary" 
              to={{ pathname: `/students/${ student.id }/doneTasks` }}
            >
              Progress 
            </Link>
            <Link 
              key={`${student.id}-2`}
              className="btn btn-outline-primary" 
              to={{ pathname: `/students/${ student.id }/tasks` }}
            >
              Tasks
            </Link>
            <Popup
              key={`${student.id}-3`}
              className='btn btn-outline-primary'
              name='Edit'>
              <StudentsForm setNewStudent={this.props.editStudent} id={student.id}/>
            </Popup>
            <Popup 
              className='btn btn-outline-danger'
              name = 'Delete'
              id={student.id}
              key={`${student.id}-4`} 
            >
              <DeleteForm type='students' setNewState={this.props.delStudent} id={student.id} name={student.name}/>
            </Popup>
           </td>
        </tr>
      )
    });
    return (
        <div className='container'>
          <Popup
            className='btn btn-outline-primary'
            name='Register'>
            <StudentsForm setNewStudent={this.props.addStudent} />
          </Popup>
          <Consumer>
            {theme => (
          <Table hover id={`${theme}`}>
            <thead>
              <tr >
                <th>№</th>
                <th>Full Name</th>
                <th>Direction</th>
                <th>Education</th>
                <th>Start</th>
                <th>Age</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {listItems}
            </tbody>
          </Table>
            )}
        </Consumer>
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    students: state.studentsState
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    addStudent: (student) => {
      dispatch({
        type: 'ADD_USER',
        student: student
      })
    },
    delStudent: (studentId) => {
      dispatch({
        type: 'DEL_USER',
        studentId: studentId
      })
    },
    editStudent: (updatedStudent) => {
      dispatch({
        type: 'EDIT_USER',
        updatedStudent: updatedStudent
      })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllStudents);

AllStudents.propTypes = {
  students: PropTypes.array,
  addStudent: PropTypes.func,
  delStudent: PropTypes.func,
  editStudent: PropTypes.func
};