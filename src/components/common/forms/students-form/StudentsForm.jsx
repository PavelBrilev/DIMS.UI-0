import React from 'react';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import { AvForm, AvGroup, AvField } from 'availity-reactstrap-validation';
import PropTypes from 'prop-types';
import { icons } from '../../icons';
import {
  setTextValidationRules,
  setTextAreaValidationRules,
  setDateValidationRules,
  setScoreValidationRules,
} from '../../form-validation';

class StudentsForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      Sex: 'M',
    };
  }

  handleChange = (event) => {
    const { target } = event;
    const { value, name } = target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    const { setNewStudent, toggle } = this.props;
    e.persist();
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
            label='First name'
            value={this.state.Name}
            onBlur={this.handleChange}
            validate={setTextValidationRules('First name')}
          />
        </AvGroup>
        <AvGroup>
          <AvField
            type='text'
            name='LastName'
            label='Last name'
            value={this.state.LastName}
            onBlur={this.handleChange}
            validate={setTextValidationRules('Last name')}
          />
        </AvGroup>
        <AvGroup>
          <AvField
            type='text'
            name='DirectionId'
            label='Direction (React/Angular/.NET)'
            value={this.state.DirectionId}
            onChange={this.handleChange}
          />
        </AvGroup>
        <AvGroup>
          <AvField
            type='text'
            name='Email'
            label='Email'
            value={this.state.Email}
            onBlur={this.handleChange}
            validate={setTextValidationRules('Valid Email')}
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
            <option value='M'>Man</option>
            <option value='W'>Woman</option>
          </Input>
        </FormGroup>
        <AvGroup>
          <AvField
            name='Education'
            type='text'
            label='Education'
            errorMessage='Enter education'
            value={this.state.Education}
            onBlur={this.handleChange}
            validate={setTextAreaValidationRules()}
          />
        </AvGroup>
        <AvGroup>
          <AvField
            name='BirthDate'
            label='Birth Date:'
            type='text'
            value={this.state.BirthDate}
            onBlur={this.handleChange}
            errorMessage='Enter start date'
            title='Use MM/DD/YYYY'
            validate={setDateValidationRules()}
          />
        </AvGroup>
        <AvGroup>
          <AvField
            name='UniversityAverageScore'
            label='University average score'
            type='number'
            value={this.state.UniversityAverageScore}
            onBlur={this.handleChange}
            validate={setScoreValidationRules('university average')}
          />
        </AvGroup>
        <AvGroup>
          <AvField
            name='MathScore'
            label='Math score'
            type='number'
            value={this.state.MathScore}
            onBlur={this.handleChange}
            validate={setScoreValidationRules('math')}
          />
        </AvGroup>
        <AvGroup>
          <AvField
            name='Address'
            type='text'
            label='Address'
            errorMessage='Enter Address'
            value={this.state.Address}
            onBlur={this.handleChange}
            validate={setTextAreaValidationRules()}
          />
        </AvGroup>
        <AvGroup>
          <AvField
            name='MobilePhone'
            type='text'
            label='MobilePhone'
            errorMessage='Enter Mobile Phone'
            value={this.state.MobilePhone}
            onBlur={this.handleChange}
          />
        </AvGroup>
        <AvGroup>
          <AvField
            name='Skype'
            type='text'
            label='Skype'
            errorMessage='Enter Skype'
            value={this.state.Skype}
            onBlur={this.handleChange}
            validate={setTextAreaValidationRules()}
          />
        </AvGroup>
        <AvGroup>
          <AvField
            name='StartDate'
            label='Start Date:'
            type='text'
            value={this.state.StartDate}
            onBlur={this.handleChange}
            errorMessage='Enter start date'
            title='Use MM/DD/YYYY'
            validate={setDateValidationRules()}
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
