import React from 'react';
import { Button } from 'reactstrap';
import storage from '../../Storage';
import PropTypes from 'prop-types';
import { icons } from '../../styles/icons'

class DeleteForm extends React.Component {

  handleDelete = () => {
    if(this.props.type === 'students') {
      storage.deleteStudent(parseInt(this.props.id))
    } else if (this.props.type === 'task') {
      storage.deleteTask(parseInt(this.props.id))
    }
    this.props.setNewState(this.props.id);
    this.props.toggle();
  }

  render() {
    return (
      <div>
        <p> Delete {this.props.name} ? </p>
        <Button outline type='button' color="danger" onClick={this.handleDelete} block >{icons.deleteIcon} Delete</Button>
      </div>

    );
  }
}

export default DeleteForm;

DeleteForm.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.number.isRequired,
  setNewState: PropTypes.func,
  toggle: PropTypes.func
};