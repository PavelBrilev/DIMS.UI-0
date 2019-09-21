import React from 'react';
import './Row.css';

const RowCell = ({ name }) => <td>{name}</td>;

function Row({cells, headerСells, elements, ...rest}) {
  const values = [];
  
  for (const key in cells) {
    for (let i = 0; i < headerСells.length; i++) {
      if (key === headerСells[i]) {
        values.push(cells[key]);
      }
    }
  }

  values[values.length] = elements;
 
  const listItems = values.map((item, index) => {
    return <RowCell name={item} key={index} />
  });

  return <tr>{listItems}</tr>;
}

export default Row;
