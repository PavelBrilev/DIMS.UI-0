import React from 'react';
import './Row.css';

const RowCell = ({ name }) => <td>{name}</td>;

function Row({cells, headerСells, elements, ...rest}) {
  const initialValue = [];
  const reducer = (accumulator, cellKey) => accumulator.concat([cells[cellKey]]);
  const values = Object.keys(cells).reduce(reducer, initialValue)

  values.push(elements);
 
  const listItems = values.map((item, index) => <RowCell name={item} key={index} />);

  return <tr>{listItems}</tr>;
}

export default Row;
