import React from 'react';
import storage from '../Storage.js';
import Popup from '../Popup/Popup.js';
import StudentsForm from '../Form/StudentsForm.jsx';
import DeleteForm from '../Form/DeleteForm.jsx';
import { Link } from "react-router-dom";
import './AllStudents.css';
import { Table } from 'reactstrap';

class AllStudents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.initStudents();
  }

  initStudents = () => {
    const students = storage.getStudents();
    this.setState({ students })
  }

  render() {
    const { students } = this.state;
    if (!students || students.length === 0) {
      return (
        <div className='container'>
          <Popup
            className='btn btn-outline-primary btn-block'
            name='Register'>
            <StudentsForm setNewStudent={this.initStudents} />
          </Popup>
            <p className='text'>No registered</p>
        </div>
      );
    } 

    let listItems = students.map(student => {
      return (
        <tr key={student.id}>
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
              <StudentsForm setNewStudent={this.initStudents} id={student.id}/>
            </Popup>
            <Popup 
              className='btn btn-outline-danger'
              name = 'Delete'
              id={student.id}
              key={`${student.id}-4`} 
            >
              <DeleteForm type='students' setNewState={this.initStudents} id={student.id} name={student.name}/>
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
            <StudentsForm setNewStudent={this.initStudents} />
          </Popup>
          <Table hover>
            <thead>
              <tr>
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
        </div>
    );
  }
}


export default AllStudents;
