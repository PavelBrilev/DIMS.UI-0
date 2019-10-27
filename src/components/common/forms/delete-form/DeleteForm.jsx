import React from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';
import storage from '../../../../storage';
import { icons } from '../../icons';
import { ItemTypes } from '../../../../constants/item-types';

class DeleteForm extends React.Component {
  handleDelete = () => {
    const { type, id, setNewState, toggle } = this.props;

    // if (type === ItemTypes.STUDENTS) {
    //   storage.deleteStudent(parseInt(id, 10));
    // } else if (type === ItemTypes.TASK) {
    //   storage.deleteTask(parseInt(id, 10));
    // }

    setNewState(id);
    toggle();
  };

  render() {
    const { name } = this.props;

    return (
      <div>
        <p>{`Delete ${name}?`}</p>
        <Button
          outline
          type='button'
          color='danger'
          onClick={this.handleDelete}
          block
        >
          {icons.deleteIcon} Delete
        </Button>
      </div>
    );
  }
}

export default DeleteForm;

DeleteForm.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  setNewState: PropTypes.func,
  toggle: PropTypes.func,
};

DeleteForm.defaultProps = {
  setNewState: () => {},
  toggle: () => {},
};
