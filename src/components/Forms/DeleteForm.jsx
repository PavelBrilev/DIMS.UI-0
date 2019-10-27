import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';
import storage from '../../storage';
import { icons } from '../common/icons';
import { delStudent } from '../../redusers/actions';

class DeleteForm extends React.Component {
  handleDelete = () => {
    const { type, id, toggle, dispatch } = this.props;

    if (type === 'students') {
      dispatch(delStudent(parseInt(id, 10)));
    } else if (type === 'task') {
      storage.deleteTask(parseInt(id, 10));
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
          {`${icons.deleteIcon} Delete`}
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
  toggle: PropTypes.func,
};

DeleteForm.defaultProps = {
  toggle: () => {},
};
