import React from 'react';
import ReactDOM from 'react-dom';
import { TableD } from '../GeneralElements/GeneralElements.js';
import { TableH } from '../GeneralElements/GeneralElements.js';
import students from '../Students.js';

function TableRH() {
  return (
    <tr>
      <TableH name='#' />
      <TableH name='Task' />
      <TableH name='Note' />
      <TableH name='Date' />
    </tr>
  );
}

function TableRD(props) {
  return (
    <tr>
      <TableD name='' />
      <TableD name={props.person.address.street} />
      <TableD name={props.person.address.suite} />
      <TableD name={props.person.address.city} />
    </tr>
  );
}

function MemberProgressGrid() {
  var rows = [];
  for (let i = 0; i < students.length; i++) {
    rows.push(<TableRD person={students[i]} />);
  }
  const element = (
    <div>
      <table>
        <TableRH />
        <tbody>{rows}</tbody>
      </table>
    </div>
  );

  ReactDOM.render(element, document.getElementById('root'));
}
export default MemberProgressGrid;
