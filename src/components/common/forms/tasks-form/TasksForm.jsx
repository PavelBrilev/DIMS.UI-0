import React from 'react';
import PropTypes from 'prop-types';
import { Button, FormGroup, Label, Input, ButtonGroup } from 'reactstrap';
import { AvForm, AvGroup, AvField } from 'availity-reactstrap-validation';
import { icons } from '../../icons';
import { connect } from 'react-redux';

class TasksForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      Name: '',
      Description: '',
      StartDate: '',
      DeadLineDate: '',
      SelectedUsers: [],
    };
  }

  componentDidMount() {
    // const { id } = this.props;
    // if (id) {
    //   this.setState(storage.getTask(id));
    // }
  }

  onCheckboxBtnClick = (selected) => {
    const index = this.state.SelectedUsers.indexOf(selected);
    if (index < 0) {
      this.state.SelectedUsers.push(selected);
    } else {
      this.state.SelectedUsers.splice(index, 1);
    }
    this.setState({ SelectedUsers: [...this.state.SelectedUsers] });
  };

  handleChange = (e) => {
    const { target } = e;
    const { value, name } = target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    const { setNewTask, toggle } = this.props;
    e.persist();
    console.log(this.state);
    setNewTask(this.state);
    toggle();
  };

  checkStudents = () =>
    this.props.students.map((student) => {
      return (
        <Button
          outline
          color='secondary'
          key={student.UserId}
          onClick={() => this.onCheckboxBtnClick(student.UserId)}
          active={this.state.SelectedUsers.includes(student.UserId)}
        >
          {student.FullName}
        </Button>
      );
    });

  render() {
    return (
      <AvForm onValidSubmit={this.handleSubmit}>
        <AvGroup>
          <AvField
            name='Name'
            type='text'
            label='Task name'
            value={this.state.Name}
            onChange={this.handleChange}
            /* validate={{
              required: {
                value: true,
                errorMessage: 'Please enter a task name',
              },
              maxLength: {
                value: 16,
                errorMessage:
                  'Your task name must be between 3 and 16 characters',
              },
            }} */
          />
        </AvGroup>
        <AvGroup>
          <AvField
            type='textarea'
            name='Description'
            label='Description'
            value={this.state.Description}
            onChange={this.handleChange}
            /* validate={{
              required: {
                value: true,
                errorMessage: 'Please enter description',
              },
              maxLength: {
                value: 300,
                errorMessage:
                  'Your description must be less than 300 characters',
              },
            }} */
          />
        </AvGroup>
        <FormGroup>
          <Label for='start'>Start date:</Label>
          <Input
            name='StartDate'
            id='start'
            type='text'
            value={this.state.StartDate}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for='deadline'>Deadline:</Label>
          <Input
            name='DeadLineDate'
            id='deadline'
            type='text'
            value={this.state.DeadLineDate}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup>
          <div>Students</div>
          <ButtonGroup>{this.checkStudents()}</ButtonGroup>
        </FormGroup>

        <Button outline type='submit' color='success' block>
          {icons.submitIcon}Submit
        </Button>
      </AvForm>
    );
  }
}

const mapStateToProps = ({ studentsState }) => ({
  students: studentsState.students,
});

export default connect(mapStateToProps)(TasksForm);

TasksForm.propTypes = {
  id: PropTypes.number,
  setNewState: PropTypes.func,
  toggle: PropTypes.func,
};
