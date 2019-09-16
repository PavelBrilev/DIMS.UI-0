import React from 'react';
import Storage from '../Storage.js';
import RowHeader from '../GeneralComponents/RowHeader/RowHeader.jsx';
import Row from '../GeneralComponents/Row/Row.jsx';
import Popup from '../Popup/Popup.js';
import StudentsForm from '../Form/StudentsForm.jsx';
import { Link } from "react-router-dom";
import './AllStudents.css';
import { Table, Button } from 'reactstrap';


const CELLS_HEADER = [
  'id',
  'name',
  'lastName',
  'direction',
  'education',
  'start',
  'age',
  '',
];

let storage = Storage();
let students = storage.getStorage();

class AllStudents extends React.Component {
  constructor(props) {
    super(props);
    this.state = { students: students };

    this.handleClick = this.handleClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleClick() {
    students = storage.getStorage();
    this.setState({ students: storage.getStorage() });
  }

  handleDelete(event) {
    let target = event.target;
    for (let i = 0; i < students.length; i++) {
      if (students[i].id === target.id) {
        students.splice(i, 1);
        storage.setStorage(students);
        this.setState({ students: storage.getStorage() });

      }
    }
  }

  render() {
    if (!students || students.length === 0) {
      return (
        <div className='container'>
          <Popup
            className='btn btn-outline-primary btn-block'
            name='Register'
            form={<StudentsForm newStateMembers={this.handleClick} />}
          />
          <p className='text'>No registered</p>
        </div>
      );
    } else {
      let listItems = this.state.students.map((student) => (
        <Row
          cells={student}
          cellsHeader={CELLS_HEADER}
          key={student.id}
          elements={[
            <Link className = "btn btn-outline-primary" to={`/studentsDoneTasks/${student.id}`} > Progress </Link> ,
            <Link className = "btn btn-outline-primary" to={`/studentsTasks/${student.id}`} > Tasks </Link> ,
            <Popup
              name='Edit'
              form={<StudentsForm newStateMembers={this.handleClick} id={student.id} />}
            />,
            <Button outline color="danger" onClick={this.handleDelete} id={student.id}>Delete </Button>,
          ]}
        />
      ));

      return (

          <div className='container'>
            <Popup
              name='Register'
              form={<StudentsForm newStateMembers={this.handleClick} 
              />}
            />
            <Table hover>
              <thead>
                <RowHeader cells={CELLS_HEADER} />
              </thead>
              <tbody>{listItems}</tbody>
            </Table>
          </div>
      );
    }
  }
}

export default AllStudents;
