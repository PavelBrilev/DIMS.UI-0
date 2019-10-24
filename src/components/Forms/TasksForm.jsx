import React from 'react';
import { Button, FormGroup, Label, Input, ButtonGroup } from 'reactstrap';
import { AvForm, AvGroup, AvField } from 'availity-reactstrap-validation';
import storage from '../../storage';
import PropTypes from 'prop-types';
import { icons } from '../../styles/icons';

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
      note: '',
    };
  }

  componentDidMount() {
    const { id } = this.props;
    if (id) {
      this.setState(storage.getTask(id));
    }
  }

  onCheckboxBtnClick = (selected) => {
    const index = this.state.students.indexOf(selected);
    if (index < 0) {
      this.state.students.push(selected);
    } else {
      this.state.students.splice(index, 1);
    }
    this.setState({ students: [...this.state.students] });
  };

  handleChange = (event) => {
    const { target } = event;
    const { value, name } = target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    storage.saveTask(this.state);
    this.props.setNewTasks(this.state);
    this.props.toggle();
  };

  render() {
    const checkStudents = storage.getStudents().map((student) => {
      return (
        <Button
          outline
          color='secondary'
          key={student.id}
          onClick={() => this.onCheckboxBtnClick(student.id)}
          active={this.state.students.includes(student.id)}
        >
          {student.name}
        </Button>
      );
    });
    return (
      <AvForm onValidSubmit={this.handleSubmit}>
        <AvGroup>
          <AvField
            name='taskName'
            type='text'
            label='Task name'
            value={this.state.taskName}
            onChange={this.handleChange}
            validate={{
              required: {
                value: true,
                errorMessage: 'Please enter a task name',
              },
              maxLength: {
                value: 16,
                errorMessage:
                  'Your task name must be between 3 and 16 characters',
              },
            }}
          />
        </AvGroup>
        <AvGroup>
          <AvField
            type='textarea'
            name='description'
            label='Description'
            value={this.state.description}
            onChange={this.handleChange}
            validate={{
              required: {
                value: true,
                errorMessage: 'Please enter description',
              },
              maxLength: {
                value: 300,
                errorMessage:
                  'Your description must be less than 300 characters',
              },
            }}
          />
        </AvGroup>
        <FormGroup>
          <Label for='direction'>Start date:</Label>
          <Input
            name='start'
            id='start'
            type='text'
            value={this.state.start}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for='deadline'>Deadline:</Label>
          <Input
            name='deadline'
            id='deadline'
            type='text'
            value={this.state.deadline}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup>
          <div>Students</div>
          <ButtonGroup>{checkStudents}</ButtonGroup>
        </FormGroup>

        <Button outline type='submit' color='success' block>
          {icons.submitIcon}Submit
        </Button>
      </AvForm>
    );
  }
}

export default TasksForm;

TasksForm.propTypes = {
  id: PropTypes.number,
  setNewState: PropTypes.func,
  toggle: PropTypes.func,
};
