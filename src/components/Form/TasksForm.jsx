import React from 'react';
import { Button, FormGroup, Label, Input, CustomInput } from 'reactstrap';
import { AvForm, AvGroup, AvField } from 'availity-reactstrap-validation';
import storage from '../Storage.js';

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
        students: [],
        note: ''
      };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { id } = this.props;
    if (id) {
      this.setState(storage.getTask(id))
    }
  };

  handleChange (event) {
    const { target } = event;
    const { value, name, type } = target;
    const result = type === 'checkbox' ? this.setState({students: this.state.students.concat([parseInt(name)])}) : value;
    
    this.setState({ [name]: value });
  }

  handleSubmit() {
    storage.saveTask(this.state);
    this.props.setNewTasks();
    this.props.toggle();

    return false
  }

  render() {
    const checkStudents = storage.getStudents().map(student => {
      return(
        <CustomInput type="checkbox" key={student.id} id={student.name} name={student.id} label={student.name + ' ' + student.lastName} onChange={this.handleChange}/>
      )
    })
    return (
      <AvForm onValidSubmit={this.handleSubmit}>
        <AvGroup>
          <AvField name="taskName" type="text" label="Task name" value={this.state.taskName} onChange={this.handleChange} validate={{
            required: {value: true, errorMessage: 'Please enter a task name'},
            maxLength: {value: 16, errorMessage: 'Your task name must be between 3 and 16 characters'}
          }} />
        </AvGroup>
        <AvGroup>
          <AvField type="textarea" name="description" label="Description" value={this.state.description} onChange={this.handleChange} validate={{
            required: {value: true, errorMessage: 'Please enter description'},
            maxLength: {value: 300, errorMessage: 'Your description must be less than 300 characters'}
          }}/>
        </AvGroup>
        <FormGroup>
          <Label for="direction">Start date:</Label>
          <Input name="start" id="start" type="text" value={this.state.start} onChange={this.handleChange} />
        </FormGroup>
        <FormGroup>
          <Label for="deadline">Deadline:</Label>
          <Input name="deadline" id="deadline" type="text" value={this.state.deadline} onChange={this.handleChange} />
        </FormGroup>
        <FormGroup>
          <Label>Students</Label>
            <div>
              {checkStudents}
            </div>
        </FormGroup>
        <Button outline type='submit' color="success" block>Submit</Button>
      </AvForm>

    );
  }
}

export default TasksForm;
