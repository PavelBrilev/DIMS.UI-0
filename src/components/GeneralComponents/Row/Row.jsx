import React from 'react';
import './Row.css';


const RowCell = ({ name }) => <td>{name}</td>;

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
  
  const listItems = values.map((item) => <RowCell name={item} key={item.index} />);
  return <tr>{listItems}</tr>;
}

export default Row;
