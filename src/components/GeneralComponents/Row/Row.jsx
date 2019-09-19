import React from 'react';
import './Row.css';


const RowCell = ({ name }) => <td>{name}</td>;

function Row({cells, headerСells, elements, ...rest}) {
  const values = [];
  for (let key in cells) {
    for (let i = 0; i < headerСells.length; i++) {
      if (key === headerСells[i]) {
        values.push(cells[key]);
      }
    }
  }
  values[values.length] = elements;
 
  const listItems = values.map((item) => <RowCell name={item} key={cells.id} />);
  return <tr>{listItems}</tr>;
}

export default Row;
