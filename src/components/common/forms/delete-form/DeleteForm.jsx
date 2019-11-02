import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';
import { icons } from '../../icons';
import { ItemTypes } from '../../../../constants/item-types';
import { deleteUser } from '../../../../reducers/studentsActions';
import { deleteTask } from '../../../../reducers/tasksActions';

class DeleteForm extends React.Component {
  handleDelete = () => {
    const { type, id, dispatch, toggle } = this.props;
    if (type === ItemTypes.STUDENTS) {
      dispatch(deleteUser(parseInt(id, 10)));
    } else if (type === ItemTypes.TASK) {
      dispatch(deleteTask(parseInt(id, 10)));
    }
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

export default connect()(DeleteForm);

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
