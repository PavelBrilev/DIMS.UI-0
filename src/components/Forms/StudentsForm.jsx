import React from 'react';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import { AvForm, AvGroup, AvField } from 'availity-reactstrap-validation';
import storage from '../../Storage'
import PropTypes from 'prop-types';
import { icons } from '../../styles/icons'

class StudentsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      UserId: '',
      FullName: '',
      Direction: '',
      Education: '',
      Start: '',
      Age: '',
    };
  }

  componentDidMount() {
    const { id } = this.props;
    if (id) {
      this.setState(storage.getStudent(id));
    }
  }

  handleChange = (event) => {
    const { target } = event;
    const { value, name } = target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    const { setNewStudent, toggle } = this.props;
    e.preventDefault();
    storage.saveStudent(this.state);
    setNewStudent(this.state);
    toggle();
  };

  render() {
    return (
      <AvForm onValidSubmit={this.handleSubmit}>
        <AvGroup>
          <AvField
            name='FullName'
            type='text'
            label='Full Name'
            value={this.state.FullName}
            onChange={this.handleChange}
            // validate={{
            //   required: { value: true, errorMessage: 'Please enter a name' },
            //   minLength: {
            //     value: 3,
            //     errorMessage: 'Your name must be between 3 and 16 characters',
            //   },
            //   maxLength: {
            //     value: 16,
            //     errorMessage: 'Your name must be between 3 and 16 characters',
            //   },
            // }}
          />
        </AvGroup>
        <AvGroup>
          <AvField
            type='text'
            name='lastName'
            label='Last name'
            value={this.state.lastName}
            onChange={this.handleChange}
             /* validate={{
               required: {
                 value: true,
                 errorMessage: 'Please enter a last name',
               },
               minLength: {
                 value: 3,
                 errorMessage:
                   'Your last name must be between 3 and 16 characters',
               },
               maxLength: {
                 value: 16,
                 errorMessage:
                   'Your last name must be between 3 and 16 characters',
               },
             }} */
          />
        </AvGroup>
        <AvGroup>
          <AvField
            type='text'
            name='password'
            label='Password'
            value={this.state.password}
            onChange={this.handleChange}
             /* validate={{
               required: {
                 value: true,
                 errorMessage: 'Please enter a password',
               },
               minLength: {
                 value: 3,
                 errorMessage:
                   'Your last password must be between 3 and 16 characters',
               },
               maxLength: {
                 value: 16,
                 errorMessage:
                   'Your last password must be between 3 and 16 characters',
               },
             }} */
          />
        </AvGroup>
        <FormGroup>
          <Label for='role'>Role</Label>
          <Input
            type='select'
            name='role'
            id='role'
            value={this.state.role}
            onChange={this.handleChange}
          >
            <option value='#'>Role</option>
            <option value='admin'>Admin</option>
            <option value='mentor'>Mentor</option>
            <option value='student'>Student</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for='direction'>Direction</Label>
          <Input
            type='select'
            name='Direction'
            id='direction'
            value={this.state.Direction}
            onChange={this.handleChange}
          >
            <option value='#'>Direction</option>
            <option value='Java'>Java</option>
            <option value='JavaScript'>JavaScript</option>
            <option value='.NET'>.NET</option>
            <option value='SalesForce'>SalesForce</option>
          </Input>
        </FormGroup>
        <AvGroup>
          <AvField
            name='Education'
            type='text'
            label='Education'
            errorMessage='Enter education'
            value={this.state.Education}
            onChange={this.handleChange}
            // validate={{
            //   required: { value: true },
            //   pattern: { value: '^[A-Za-z0-9]+$' },
            // }}
          />
        </AvGroup>
        <AvGroup>
          <AvField
            name='StartDate'
            label='Start date:'
            type='text'
            value={this.state.StartDate}
            onChange={this.handleChange}
            errorMessage='Enter start date'
            title='Use MM/DD/YYYY'
            // validate={{
            //   required: { value: true },
            //   date: { format: 'MM/DD/YYYY' },
            // }}
          />
        </AvGroup>
        <AvGroup>
          <AvField
            name='Age'
            label='Age'
            type='number'
            value={this.state.Age}
            onChange={this.handleChange}
            // validate={{
            //   required: { value: true, errorMessage: 'Enter education' },
            //   min: { value: 18, errorMessage: 'Must be more than 18' },
            //   max: { value: 99, errorMessage: 'Must be less than 18' },
            // }}
          />
        </AvGroup>
        <Button outline type='submit' color='success' block>
        {icons.submitIcon} Submit
        </Button>
      </AvForm>
    );
  }
}

StudentsForm.defaultProps = {
  setNewStudent: () => {},
  toggle: () => {},
};

export default StudentsForm;


StudentsForm.propTypes = {
  setNewState: PropTypes.func,
  toggle: PropTypes.func
};