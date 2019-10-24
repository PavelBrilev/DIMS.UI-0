import React from 'react';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import { AvForm, AvGroup, AvField } from 'availity-reactstrap-validation';
import storage from '../../storage';
import PropTypes from 'prop-types';
import { icons } from '../../styles/icons';

class StudentsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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
    e.persist();
    storage.postStudent(this.state);
    setNewStudent(this.state);
    toggle();
  };

  render() {
    return (
      <AvForm onValidSubmit={this.handleSubmit}>
        <AvGroup>
          <AvField
            name='Name'
            type='text'
            label='Full Name'
            value={this.state.Name}
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
            name='LastName'
            label='Last name'
            value={this.state.LastName}
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
            name='Email'
            label='Email'
            value={this.state.Email}
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
          <Label for='sex'>Sex</Label>
          <Input
            type='select'
            name='Sex'
            id='sex'
            value={this.state.Sex}
            onChange={this.handleChange}
          >
            <option value='Man'>Man</option>
            <option value='Woman'>Woman</option>
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
            name='BirthDate'
            label='Birth Date:'
            type='text'
            value={this.state.BirthDate}
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
            name='UniversityAverageScore'
            label='University average score'
            type='number'
            value={this.state.UniversityAverageScore}
            onChange={this.handleChange}
            // validate={{
            //   required: { value: true, errorMessage: 'Enter education' },
            //   min: { value: 18, errorMessage: 'Must be more than 18' },
            //   max: { value: 99, errorMessage: 'Must be less than 18' },
            // }}
          />
        </AvGroup>
        <AvGroup>
          <AvField
            name='MathScore'
            label='Math score'
            type='number'
            value={this.state.MathScore}
            onChange={this.handleChange}
            // validate={{
            //   required: { value: true, errorMessage: 'Enter education' },
            //   min: { value: 18, errorMessage: 'Must be more than 18' },
            //   max: { value: 99, errorMessage: 'Must be less than 18' },
            // }}
          />
        </AvGroup>
        <AvGroup>
          <AvField
            name='Address'
            type='text'
            label='Address'
            errorMessage='Enter Address'
            value={this.state.Address}
            onChange={this.handleChange}
            // validate={{
            //   required: { value: true },
            //   pattern: { value: '^[A-Za-z0-9]+$' },
            // }}
          />
        </AvGroup>
        <AvGroup>
          <AvField
            name='MobilePhone'
            type='text'
            label='MobilePhone'
            errorMessage='Enter Mobile Phone'
            value={this.state.MobilePhone}
            onChange={this.handleChange}
            // validate={{
            //   required: { value: true },
            //   pattern: { value: '^[A-Za-z0-9]+$' },
            // }}
          />
        </AvGroup>
        <AvGroup>
          <AvField
            name='Skype'
            type='text'
            label='Skype'
            errorMessage='Enter Skype'
            value={this.state.Skype}
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
            label='Start Date:'
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
  toggle: PropTypes.func,
};
