import React from 'react';
import { Col, Row, Button, FormGroup, Label, Input } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import storage from '../../storage'
import PropTypes from 'prop-types';
import { icons } from '../common/icons';
import { setValidationRules } from './form-validation';

class StudentsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: '',
      LastName: '',
      Email: '',
      Sex: '',
      Education: '',
      BirthDate: '',
      UniversityAverageScore: '',
      MathScore: '',
      Address: '',
      MobilePhone: '',
      Skype: '',
      StartDate: '',
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
    e.persist();
    setNewStudent(this.state);
    toggle();
  };

  render() {
    return (
      <AvForm onValidSubmit={this.handleSubmit}>
        <Row>
          <Col md={6}>
            <AvField
              name='Name'
              type='text'
              label='Name'
              value={this.state.Name}
              onChange={this.handleChange}
              validate={setValidationRules('name')}
            />
          </Col>
          <Col md={6}>
            <AvField
              type='text'
              name='LastName'
              label='Last name'
              value={this.state.LastName}
              onChange={this.handleChange}
              validate={setValidationRules('last name')}
            />
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <AvField
              name='StartDate'
              label='Start Date'
              type='text'
              value={this.state.StartDate}
              onChange={this.handleChange}
              errorMessage='Enter start date'
              title='Use MM/DD/YYYY'
              validate={{
                date: { format: 'MM/DD/YYYY' },
              }}
            />
          </Col>
          <Col md={4}>
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
          </Col>
          <Col md={4}>
            <AvField
              name='Education'
              type='text'
              label='Education'
              errorMessage='Enter education'
              value={this.state.Education}
              onChange={this.handleChange}
            />
          </Col>
        </Row>
        <Row>
          <Col md={3}>
            <AvField
              name='BirthDate'
              label='Birth Date'
              type='text'
              value={this.state.BirthDate}
              onChange={this.handleChange}
              errorMessage='Enter birth date'
              title='Use MM/DD/YYYY'
              validate={{
                date: { format: 'MM/DD/YYYY' },
              }}
            />
          </Col>
          <Col md={6}>
            <AvField
              name='UniversityAverageScore'
              label='University average score'
              type='number'
              value={this.state.UniversityAverageScore}
              onChange={this.handleChange}
              validate={{
                min: { value: 1, errorMessage: 'Must be more than 1' },
                max: { value: 100, errorMessage: 'Must be less than 100' },
              }}
            />
          </Col>
          <Col md={3}>
            <AvField
              name='MathScore'
              label='Math score'
              type='number'
              value={this.state.MathScore}
              onChange={this.handleChange}
              validate={{
                min: { value: 1, errorMessage: 'Must be more than 1' },
                max: { value: 100, errorMessage: 'Must be less than 100' },
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <AvField
              name='Address'
              type='text'
              label='Address'
              errorMessage='Enter Address'
              value={this.state.Address}
              onChange={this.handleChange}
              validate={{
                pattern: { value: '^[A-Za-z0-9]+$' },
              }}
            />
          </Col>
          <Col md={6}>
            <AvField
              name='MobilePhone'
              type='text'
              label='Mobile Phone'
              errorMessage='Enter Mobile Phone'
              value={this.state.MobilePhone}
              onChange={this.handleChange}
              validate={{
                required: { value: true },
                pattern: { value: '^[0-9]' },
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <AvField
              type='text'
              name='Email'
              label='Email'
              value={this.state.Email}
              onChange={this.handleChange}
              validate={{email: true}} 
            />
          </Col>
          <Col md={6}>
            <AvField
              name='Skype'
              type='text'
              label='Skype'
              errorMessage='Enter Skype'
              value={this.state.Skype}
              onChange={this.handleChange}
              validate={{
                required: { value: true },
                pattern: { value: '^[A-Za-z0-9]+$' },
              }}
            />
          </Col>
        </Row>
        <Button outline type='submit' color='success' block>
        {icons.submitIcon} 
        Submit
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
