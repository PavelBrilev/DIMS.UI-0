import React from 'react';
import { Button } from 'reactstrap';
import storage from '../../Storage';

class DeleteForm extends React.Component {

  handleDelete = () => {
    if(this.props.type === 'students') {
      storage.deleteStudent(parseInt(this.props.id))
    } else if (this.props.type === 'task') {
      storage.deleteTask(parseInt(this.props.id))
    }
    this.props.setNewState();
    this.props.toggle();
  }

  render() {
    return (
      <div>
        <p> Delete {this.props.name} ? </p>
        <Button outline type='button' color="danger" onClick={this.handleDelete} block >Delete</Button>
      </div>

    );
  }
}

export default DeleteForm;
