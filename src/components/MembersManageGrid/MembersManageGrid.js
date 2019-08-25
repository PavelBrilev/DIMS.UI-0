import React from 'react';
//import MemberProgressGrid from '../MemberProgressGrid/MemberProgressGrid.js';
import MemberTaskManageGrid from '../MemberTaskManageGrid/MemberTaskManageGrid.js';
import { students, getStudents, setStudents } from '../Students.js';
import './MembersManageGrid.css';
//import Header from '../Header/Header.js';
import { Button, RowHeader, Row } from '../GeneralElements/GeneralElements.js';
import Popup from '../Popup/Popup.js';
import Form from '../Form/Form.jsx';

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

getStudents();

class MembersManageGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = { students: students };

    this.handleClick = this.handleClick.bind(this);
    this.handleDel = this.handleDel.bind(this);
  }

  handleClick() {
    getStudents();
    this.setState({ students: students });
  }

  handleDel(event) {
    let target = event.target;
    for (let i = 0; i < students.length; i++) {
      if (students[i].id === target.id) {
        students.splice(i, 1);
        setStudents(students);
      }
    }
    getStudents();
    this.setState({ students: students });
  }

  render() {
    if (!students || students.length === 0) {
      return (
        <>
          <Popup
            name='Register'
            form={<Form newStateMembers={this.handleClick} />}
          />
          <div>Нет зарегистрированных</div>
        </>
      );
    } else {
      let listItems = this.state.students.map((student) => (
        <Row
          cells={student}
          cellsHeader={CELLS_HEADER}
          key={student.id}
          elements={[
            <Button name='Progress' />,
            <Button
              name='Tasks'
              onClick={MemberTaskManageGrid}
              id={student.id}
            />,
            <Popup
              name='Edit'
              form={<Form newStateMembers={this.handleClick} id={student.id} />}
            />,
            <Button name='Delete' onClick={this.handleDel} id={student.id} />,
          ]}
        />
      ));

      return (
        <>
          <Popup
            name='Register'
            form={<Form newStateMembers={this.handleClick} />}
          />
          <table>
            <thead>
              <RowHeader cells={CELLS_HEADER} />
            </thead>
            <tbody>{listItems}</tbody>
          </table>
        </>
      );
    }
  }
}

export default MembersManageGrid;
