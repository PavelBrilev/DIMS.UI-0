import React from 'react';
import { Button, FormGroup, Label, CustomInput } from 'reactstrap';
import { AvForm, AvGroup, AvField } from 'availity-reactstrap-validation';
import Storage from '../Storage.js';

class TasksForm extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        id: '',
        taskName: '',
        description: '',
        start: '',
        deadline: '',
        doneDate: '',
        students: '',
        note: ''
      };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { id } = this.props;
    if (id) {
      this.setState(Storage().getTask(id))
    }
  };

  handleChange (event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit() {
    Storage().saveTask(this.state);
    this.props.setNewTasks();
    this.clearForm();

    return false
  }

  clearForm () {
    this.setState({
      id: '',
      taskName: '',
      description: '',
      start: '',
      deadline: '',
      doneDate: '',
      students: '',
      note: ''
    });
  }

  render() {
    return (
      <AvForm onValidSubmit={this.handleSubmit}>
        <AvGroup>
          <AvField name="taskName" type="text" label="Task name" value={this.state.taskName} onChange={this.handleChange} validate={{
            required: {value: true, errorMessage: 'Please enter a task name'},
            pattern: {value: '^[A-Za-z0-9]+$', errorMessage: 'Your task name must be composed only with letter and numbers'},
            maxLength: {value: 16, errorMessage: 'Your task name must be between 3 and 16 characters'}
          }} />
        </AvGroup>
        <AvGroup>
          <AvField type="textarea" name="description" label="Description" value={this.state.description} onChange={this.handleChange} validate={{
            required: {value: true, errorMessage: 'Please enter description'},
            pattern: {value: '^[A-Za-z0-9]+$', errorMessage: 'Your description must be composed only with letter and numbers'},
            maxLength: {value: 300, errorMessage: 'Your description must be less than 300 characters'}
          }}/>
        </AvGroup>
        <AvGroup>
          <AvField name="start" label="Start date:" type="text" value={this.state.start} onChange={this.handleChange} errorMessage="Enter start date" title="Use MM/DD/YYYY"  validate={{
            required: {value: true},
            date: {format: 'MM/DD/YYYY'}, 
            }} />
        </AvGroup>
        <AvGroup>
          <AvField name="deadline" label="Deadline:" type="text" value={this.state.deadline} onChange={this.handleChange} errorMessage="Enter deadline date" title="Use MM/DD/YYYY"  validate={{
            required: {value: true},
            date: {format: 'MM/DD/YYYY'}, 
            }} />
        </AvGroup>
        <FormGroup>
          <Label for="exampleCheckbox">Students</Label>
          <div>
            <CustomInput type="checkbox" id="exampleCustomCheckbox" label="Check this custom checkbox" />
            <CustomInput type="checkbox" id="exampleCustomCheckbox2" label="Or this one" />
            <CustomInput type="checkbox" id="exampleCustomCheckbox3" label="Check this custom checkbox" />
            <CustomInput type="checkbox" id="exampleCustomCheckbox4" label="Or this one" />
          </div>
        </FormGroup>


        <Button outline type='submit' color="success" block>Submit</Button>
      </AvForm>

    );
  }
}

export default TasksForm;
