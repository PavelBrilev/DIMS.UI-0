import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Storage from '../Storage.js';

let index;
let storage = Storage();
let students = storage.getStorage();

class StudentsForm extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        id: '',
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
  }

  componentDidMount() {
    if (this.props.id) {
      index = students.map((o) => o.id).indexOf(this.props.id);
      this.setState(students[index]);
    }
  };

  handleChangeName(event) {
    this.setState({ name: event.target.value });
    if (!students || students.length === 0) {
      this.setState({ id: '1' });
    } else if (!this.props.id) {
      let id = Number(students[students.length - 1].id);
      this.setState({ id: `${id + 1}` });
    }
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit(event) {
    event.preventDefault();
    if (this.props.id) {
      students[index] = this.state;
      storage.setStorage(students);
    } else {
      if (!students || students.length === 0) {
        storage.setStorage([this.state]);
      } else {
        students = storage.getStorage();
        storage.setStorage(students.concat([this.state]));
      }
    }
    this.props.newStateMembers();
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
