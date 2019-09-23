import React from 'react';
import { Button, Table } from 'reactstrap';
import RowHeader from '../GeneralComponents/RowHeader/RowHeader.jsx';
import Row from '../GeneralComponents/Row/Row.jsx';
import Storage from '../Storage.js';

const HEADER_CELLS = ['id', 'name', 'start', 'deadline', 'status', ''];

class StudentTasks extends React.Component {

  render() { 
    const studentId = parseInt(this.props.match.params.studentId);
    const tasks = Storage().getTasks();
    const tasksList = tasks.filter(item => item.userId.includes(studentId));
    const listItems = tasksList.map((task) => (
      <Row
          cells={task}
          headerСells={HEADER_CELLS}
          key={task.id}
          elements={[
            <Button key={`${ task.id }-1`} outline color="primary">Track</Button>,
          ]}
        />
    ))

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
}

export default StudentTasks;
