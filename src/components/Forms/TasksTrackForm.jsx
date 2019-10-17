import React from 'react';
import { Button } from 'reactstrap';
import { AvForm, AvGroup, AvField } from 'availity-reactstrap-validation';
import storage from '../../Storage';
import PropTypes from 'prop-types';

class TasksTrackForm extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
      };
  }

  componentDidMount() {
    const { id } = this.props;
    if (id) {
      this.setState(storage.getTask(id))
    }
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit = () => {
    storage.saveTask(this.state);
    this.props.setNewTasks();
    this.props.toggle();

    return false
  }

  render() {
    return (
      <AvForm onValidSubmit={this.handleSubmit}>
        <AvGroup>
          <AvField name="doneDate" label="Done date:" type="text" value={this.state.doneDate} onChange={this.handleChange} validate={{
            required: {value: true, errorMessage: "Enter done date"},
            date: {format: 'MM/DD/YYYY', errorMessage: "Use MM/DD/YYYY"},
            }} />
        </AvGroup>
        <AvGroup>
          <AvField type="textarea" name="note" label="Note" value={this.state.note} onChange={this.handleChange} validate={{
            required: {value: true, errorMessage: 'Please enter note'},
            maxLength: {value: 300, errorMessage: 'Your description must be less than 300 characters'}
          }}/>
        </AvGroup>
        <Button outline type='submit' color="success" block>Submit</Button>
      </AvForm>

    );
  }
}

export default TasksTrackForm;


TasksTrackForm.propTypes = {
  id: PropTypes.number.isRequired,
  setNewState: PropTypes.func,
  toggle: PropTypes.func
};