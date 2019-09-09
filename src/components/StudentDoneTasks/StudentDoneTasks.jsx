import React from 'react';
import RowHeader from '../GeneralComponents/RowHeader/RowHeader.jsx';
import Row from '../GeneralComponents/Row/Row.jsx';
import tasks from '../tasks.js';

const CELLS_HEADER = ['id', 'name', 'note', 'date'];

class StudentDoneTasks extends React.Component {
  constructor(props) {
    super(props);
  }

  render() { 
  let listItems = [];
  for (let i = 0; i < tasks.length; i++) {
    let idx = tasks[i].userId.indexOf(Number(this.props.id));
    if (idx !== -1 ) {
      listItems.push(
        <Row
          cells={tasks[i]}
          cellsHeader={CELLS_HEADER}
          key={tasks[i].id}
        />,
      );
    }
  }

  return (
    <div>
      <table>
        <thead>
          <RowHeader cells={CELLS_HEADER} />
        </thead>
        <tbody>{listItems}</tbody>
      </table>
    </div>
  )
  }
}


export default StudentDoneTasks;
