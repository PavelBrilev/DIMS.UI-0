import React from 'react';
import { Button, Table } from 'reactstrap';
import RowHeader from '../GeneralComponents/RowHeader/RowHeader.jsx';
import Row from '../GeneralComponents/Row/Row.jsx';
import tasks from '../tasks.js';

const HEADER_CELLS = ['id', 'name', 'start', 'deadline', 'status', ''];

class StudentTasks extends React.Component {
  constructor(props) {
    super(props);
  }

  render() { 
  let listItems = [];
  for (let i = 0; i < tasks.length; i++) {
    let idx = tasks[i].userId.indexOf(Number(this.props.id));
    if (idx !== -1) {
      listItems.push(
        <Row
          cells={tasks[i]}
          headerСells={HEADER_CELLS}
          key={tasks[i].id}
          elements={[
            <Button outline color="primary">Track</Button>,
            <Button outline color="success">Success</Button>,
            <Button outline color="danger">Fail</Button>,
          ]}
        />,
      );
    }
  }

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
