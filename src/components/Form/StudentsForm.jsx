import React from 'react';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import { AvForm, AvGroup, AvField } from 'availity-reactstrap-validation';
import Storage from '../Storage.js';

const storage = Storage();
let students = storage.getValues('students');  //needs const

class StudentsForm extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        id: '1',
        name: '',
        lastName: '',
        direction: 'Direction',
        education: '',
        start: '',
        age: '',
      };

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
  }

  componentDidMount() {
    if(students) {
      this.setState(students.find(item => item.id === this.props.id));
    }
  };

  handleChangeName(event) {
    this.setState({ name: event.target.value });
    if (!this.props.id  && students.length !== 0) {
      const id = Number(students[students.length - 1].id) + 1;
      this.setState({ id });
    }
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleCheck() {
    if(this.props.id) {
      const index = students.findIndex((item) => item.id === this.props.id);      
      students[index] = this.state;
    } else if (!students || students.length === 0) {
      students = [this.state];
      } else {
      students = Storage().getValues('students').concat([this.state]);
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.handleCheck();
    storage.setValues('students', students);
    this.props.setNewStudent();
  }

  render() {
    return (
      <AvForm onValidSubmit={this.handleSubmit}>
        <AvGroup>
          <AvField name="firstName" type="text" label="Name" errorMessage="Min 3 symbols" value={this.state.name} onChange={this.handleChangeName} validate={{
            required: {value: true},
            pattern: {value: '^[A-Za-z0-9]+$'},
            minLength: {value: 3},
            maxLength: {value: 16}
          }} />
        </AvGroup>
        <AvGroup>
          <AvField type="text" name="lastName" label="Last name" errorMessage="Min 3 symbols" value={this.state.lastName} onChange={this.handleChange} validate={{
            required: {value: true},
            pattern: {value: '^[A-Za-z0-9]+$'},
            minLength: {value: 3},
            maxLength: {value: 16}
          }}/>
        </AvGroup>
        <FormGroup>
          <Label for="direction">Direction</Label>
          <Input type="select" name="direction" id="direction" value={this.state.direction} onChange={this.handleChange}>
            <option value='#'>Direction</option>
            <option value='Java'>Java</option>
            <option value='JavaScript'>JavaScript</option>
            <option value='.NET'>.NET</option>
            <option value='SalesForce'>SalesForce</option>
          </Input>
        </FormGroup>
        <AvGroup>
          <AvField name="education" type="text" label="Education" errorMessage="Enter education" value={this.state.education} onChange={this.handleChange} validate={{
            required: {value: true},
            pattern: {value: '^[A-Za-z0-9]+$'},
          }} />
        </AvGroup>
        <AvGroup>
          <AvField name="start" label="Start date:" type="text" value={this.state.start} onChange={this.handleChange} errorMessage="Enter start date" title="Use MM/DD/YYYY"  validate={{
            required: {value: true},
            date: {format: 'MM/DD/YYYY'}, 
            }} />
        </AvGroup>
        <AvGroup>
          <AvField name="age" label="Age" type="number" errorMessage="Enter education" value={this.state.age} onChange={this.handleChange} validate={{
            min: {value: 18},
            max: {value: 99}
            }} />
        </AvGroup>
        <Button outline type='submit' color="success" block>Submit</Button>
      </AvForm>

    );
  }
}

export default StudentsForm;
