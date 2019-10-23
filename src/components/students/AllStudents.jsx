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
import axios from 'axios';
import { icons } from '../../styles/icons'

class AllStudents extends React.Component {
  componentDidMount() {
    if(this.props.students.length === 0) {
      return this.props.addStudents();
    }
  }
  render() {
    const students = this.props.students;
    if (!students || students.length === 0) {
      return (
        <div className='container'>
          <Popup
            className='btn btn-outline-primary btn-block'
            icon={icons.create}
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
          <td >{student.FullName} </td>
          <td >{student.Direction} </td>
          <td >{student.Education} </td>
          <td >{student.StartDate} </td>
          <td >{student.Age} </td>
          <td >
            <Link 
              key={`${student.id}-1`}
              className="btn btn-outline-primary" 
              to={{ pathname: `/students/${ student.id }/doneTasks` }}
            >
            {icons.progressIcon}
              Progress 
            </Link>
            <Link 
              key={`${student.id}-2`}
              className="btn btn-outline-primary" 
              to={{ pathname: `/students/${ student.id }/tasks` }}
            >
            {icons.tasksIcon}
              Tasks
            </Link>
            <Popup
              key={`${student.id}-3`}
              className='btn btn-outline-primary'
              icon={icons.editIcon}
              name='Edit'>
              <StudentsForm setNewStudent={this.props.editStudent} id={student.UserId}/>
            </Popup>
            <Popup 
              className='btn btn-outline-danger'
              icon={icons.deleteIcon}
              name = 'Delete'
              id={student.id}
              key={`${student.id}-4`} 
            >
              <DeleteForm type='students' setNewState={this.props.delStudent} id={student.UserId} name={student.FullName}/>
            </Popup>
           </td>
        </tr>
      )
    });
    return (
        <div className='container'>
          <Popup
            className='btn btn-outline-primary'
            icon={icons.create}
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
    addStudents: () => {
      const asyncGetStudents = () => {
          return (dispatch) => {
            axios
            .get(`${process.env.REACT_APP_BASE_URL}api/profiles`)
            .then((response) => {
              dispatch({ type: 'ADD_ALL_USERS', students: response.data });
            })
            .catch((error) => {
              console.log(error);
            });
          }
      }
      dispatch(asyncGetStudents());
    },    
    addStudent: (newStudent) => {
      const asyncAddStudent = () => {
          return (dispatch) => {
            axios.post(`${process.env.REACT_APP_BASE_URL}api/member-profile`, {newStudent})
            .then((response) => {
              dispatch({ type: 'ADD_USER', students: response.data });
            })
            .catch((error) => {
              console.log(error);
            });
          }
      }
      dispatch(asyncAddStudent());
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