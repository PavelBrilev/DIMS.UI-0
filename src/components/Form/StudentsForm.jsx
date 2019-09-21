import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
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
      this.setState(students.find(item => item.id == this.props.id));
    }
  };

  handleChangeName(event) {
    this.setState({ name: event.target.value });
    if (!this.props.id  && students) {
      const id = Number(students[students.length - 1].id) + 1;
      this.setState({ id });
    }
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleCheck() {
    if(this.props.id) {
      const index = students.findIndex((item) => item.id == this.props.id);      
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
      <Form onSubmit={this.handleSubmit}>
        <FormGroup>
          <Label for="name">Name</Label>
          <Input type="text" id="name" value={this.state.name} onChange={this.handleChangeName} required/>
        </FormGroup>
        <FormGroup>
          <Label for="lastName">Last name</Label>
          <Input type="text" name="lastName" id="lastName" value={this.state.lastName} onChange={this.handleChange} required/>
        </FormGroup>
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
        <FormGroup>
          <Label for="education">Education</Label>
          <Input type="text" name="education" id="education" value={this.state.education} onChange={this.handleChange}/>
        </FormGroup>
        <FormGroup>
          <Label for="start">Start date:</Label>
          <Input type="date" name="start" id="start" value={this.state.start} onChange={this.handleChange}/>
        </FormGroup>
        <FormGroup>
          <Label for="age">Age</Label>
          <Input type="number" name="age" id="age" value={this.state.age} onChange={this.handleChange}/>
        </FormGroup>
        <Button outline type='submit' color="success" block>Submit</Button>
      </Form>

    );
  }
}

export default StudentsForm;
