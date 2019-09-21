import React from 'react';
import { Table } from 'reactstrap';
import RowHeader from '../GeneralComponents/RowHeader/RowHeader.jsx';
import Row from '../GeneralComponents/Row/Row.jsx';
import tasks from '../tasks.js';

const HEADER_CELLS = ['id', 'name', 'note', 'date'];

class StudentDoneTasks extends React.Component {
  constructor(props) {
    super(props);
  }

  render() { 
    const studentId = parseInt(this.props.match.params.studentId)
    const tasksList = tasks.filter(item => item.userId.includes(studentId));
    const listItems = tasksList.map((task) => (
      <Row
         cells={task}
         headerСells={HEADER_CELLS}
         key={task.id}
      />
    ));
  
  return (
    <div className='container'>
      <Table hover>
        <thead>
          <RowHeader cells={HEADER_CELLS} />
        </thead>
        <tbody>{listItems}</tbody>
      </Table>
    </div>
  )
}
};


export default StudentDoneTasks;

