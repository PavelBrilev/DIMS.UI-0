import React from 'react';
import './GeneralElements.css';

function Button({ name, ...rest }) {
  return (
    <button className='button' {...rest}>
      {name}
    </button>
  );
}

const HeaderCell = ({ name }) => <th>{name}</th>;

const RowCell = ({ name }) => <td>{name}</td>;

function RowHeader(props) {
  const listItems = props.cells.map((item) => (
    <HeaderCell name={item} key={item} />
  ));
  return <tr>{listItems}</tr>;
}

function Row(props) {
  let obj = props.cells;
  let cells = props.cellsHeader;
  let values = [];
  for (let key in obj) {
    for (let i = 0; i < cells.length; i++) {
      if (key.toString() === cells[i]) {
        values.push(obj[key]);
      }
    }
  }
  if (values.length < cells.length) {
    values.push(props.elements);
  }
  const listItems = values.map((item) => <RowCell name={item} key={item} />);

  return <tr>{listItems}</tr>;
}

export { Button, RowHeader, Row };
