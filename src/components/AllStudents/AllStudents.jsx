import React from 'react';
import Storage from '../Storage.js';
import RowHeader from '../GeneralComponents/RowHeader/RowHeader.jsx';
import Row from '../GeneralComponents/Row/Row.jsx';
import Popup from '../Popup/Popup.js';
import StudentsForm from '../Form/StudentsForm.jsx';
import { Link } from "react-router-dom";
import './AllStudents.css';
import { Table, Button } from 'reactstrap';

const HEADER_CELLS = [
  'id',
  'name',
  'lastName',
  'direction',
  'education',
  'start',
  'age',
  '',
];

const storage = Storage();
const students = storage.getValues('students');


class AllStudents extends React.Component {
  constructor(props) {
    super(props);
    this.state = { students: students };

    this.handleClick = this.handleClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleClick() {
    this.setState({ students: storage.getValues('students') });
  }

  handleDelete(event) {
    let target = event.target;
    let newStudents = storage.getValues('students').filter(item => item.id !== target.id );
    storage.setValues('students', newStudents);
    this.setState({ students: newStudents });
  }

  render() {
    if (!students || students.length === 0) {
      return (
        <div className='container'>
          <Popup
            className='btn btn-outline-primary btn-block'
            name='Register'
            form={<StudentsForm setNewStudent={this.handleClick} />}
          />
          <p className='text'>No registered</p>
        </div>
      );
    } 
    let listItems = this.state.students.map((student) => (
      <Row
        cells={student}
        headerСells={HEADER_CELLS}
        key={student.id}
        elements={[
          <Link className = "btn btn-outline-primary" to={`/studentsDoneTasks/${student.id}`} > Progress </Link> ,
          <Link className = "btn btn-outline-primary" to={`/studentsTasks/${student.id}`} > Tasks </Link> ,
          <Popup
            name='Edit'
            form={<StudentsForm setNewStudent={this.handleClick} id={student.id} />}
          />,
          <Button outline color="danger" onClick={this.handleDelete} id={student.id}>Delete </Button>,
        ]}
      />
    ));
    return (
        <div className='container'>
          <Popup
            name='Register'
            form={<StudentsForm setNewStudent={this.handleClick} 
            />}
          />
          <Table hover>
            <thead>
              <RowHeader cells={HEADER_CELLS} />
            </thead>
            <tbody>{listItems}</tbody>
          </Table>
        </div>
    );
  }
}


export default AllStudents;
