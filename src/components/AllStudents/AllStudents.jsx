import React from 'react';
import Storage from '../Storage.js';
import Button from '../GeneralComponents/Button/Button.jsx';
import RowHeader from '../GeneralComponents/RowHeader/RowHeader.jsx';
import Row from '../GeneralComponents/Row/Row.jsx';
import Popup from '../Popup/Popup.js';
import StudentsForm from '../Form/StudentsForm.jsx';
import { Link } from "react-router-dom";
import './AllStudents.css';


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
    this.setState({ students: students });
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
        <div id="table">
          <Popup
            name='Register'
            form={<StudentsForm newStateMembers={this.handleClick} />}
          />
          <div>Нет зарегистрированных</div>
        </div>
      );
    } else {
      let listItems = this.state.students.map((student) => (
        <Row
          cells={student}
          cellsHeader={CELLS_HEADER}
          key={student.id}
          elements={[
            <Link className = "button" to={`/studentsDoneTasks/${student.id}`} > Progress </Link> ,
            <Link className = "button" to={`/studentsTasks/${student.id}`} > Tasks </Link> ,
            <Popup
              name='Edit'
              form={<StudentsForm newStateMembers={this.handleClick} id={student.id} />}
            />,
            <Button name='Delete' onClick={this.handleDelete} id={student.id} />,
          ]}
        />
      ));

      return (
        <div id="table">
          <div className = "container">
            <Popup
              name='Register'
              form={<StudentsForm newStateMembers={this.handleClick} 
              />}
            />
            <table>
              <thead>
                <RowHeader cells={CELLS_HEADER} />
              </thead>
              <tbody>{listItems}</tbody>
            </table>
          </div>
        </div>
      );
    }
  }
}

export default AllStudents;
