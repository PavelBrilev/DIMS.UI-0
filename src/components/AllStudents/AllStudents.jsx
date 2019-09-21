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

class AllStudents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleClick = this.handleClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    const students = Storage().getValues('students');
    this.setState({ students });
  }

  handleClick() {
    const students = Storage().getValues('students');
    this.setState({ students });
  }

  handleDelete(event) {
    const { target } = event;
    const students = Storage().getValues('students').filter(item => item.id !== target.id );
    Storage().setValues('students', students);
    this.setState({ students });
  }

  render() {
    const { students } = this.state;

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
    
    let listItems = students.map(student => {
      return (
        <Row
          cells={student}
          headerСells={HEADER_CELLS}
          key={student.id}
          elements={[
            <Link 
              key={`${student.id}-1`}
              className="btn btn-outline-primary" 
              to={{ pathname: `/students/${ student.id }/doneTasks` }}
            >
              Progress 
            </Link>,
            <Link 
              key={`${student.id}-2`}
              className="btn btn-outline-primary" 
              to={{ pathname: `/students/${ student.id }/tasks` }}
            >
              Tasks
            </Link>,
            <Popup
              key={`${student.id}-3`}
              name='Edit'
              form={<StudentsForm setNewStudent={this.handleClick} id={student.id} />}
            />,
            <Button 
              outline 
              color="danger" 
              id={student.id}
              key={`${student.id}-4`}
              onClick={this.handleDelete} 
            >
              Delete
            </Button>,
          ]}
        />
      )
    });
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
