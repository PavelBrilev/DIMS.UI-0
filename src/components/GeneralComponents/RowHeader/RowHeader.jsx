import React from 'react';
import './RowHeader.css';

const HeaderCell = ({ name }) => <th>{name}</th>;

function RowHeader({cells, ...rest}) {
  const listItems = cells.map((item) => (
    <HeaderCell name={item} key={item} {...rest} />
  ));
  return <tr>{listItems}</tr>;
}
export default RowHeader;