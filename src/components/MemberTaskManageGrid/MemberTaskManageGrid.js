import React from 'react';
import ReactDOM from 'react-dom';
import { Button, RowHeader, Row } from '../GeneralElements/GeneralElements.js';
import tasks from '../tasks.js';
import Header from '../Header/Header.js';

const CELLS_HEADER = ['id', 'name', 'start', 'deadline', 'status', ''];

function MemberTaskManageGrid(event) {
  let target = event.target;
  let listItems = [];
  for (let i = 0; i < tasks.length; i++) {
    let idx = tasks[i].userId.indexOf(Number(target.id));
    if (idx !== -1) {
      listItems.push(
        <Row
          cells={tasks[i]}
          cellsHeader={CELLS_HEADER}
          key={tasks[i].id}
          elements={[
            <Button name='Track' />,
            <Button name='Succes' />,
            <Button name='Fail' />,
          ]}
        />,
      );
    }
  }

  const element = (
    <table>
      <thead>
        <RowHeader cells={CELLS_HEADER} />
      </thead>
      <tbody>{listItems}</tbody>
    </table>
  );

  ReactDOM.render(element, document.getElementById('root'));
}
export default MemberTaskManageGrid;
