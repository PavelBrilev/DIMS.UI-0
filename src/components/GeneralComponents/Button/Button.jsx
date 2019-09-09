import React from 'react';
import './Button.css';

function Button({ name, ...rest }) {
  return (
    <button className='button' {...rest}>
      {name}
    </button>
  );
}

export default Button;
