import React from 'react';
import { Button } from '../GeneralElements/GeneralElements.js';
import { students, setStudents } from '../Students.js';
import './Form.css';

let index;

class Form extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.id) {
      index = students.map((o) => o.id).indexOf(props.id);
      this.state = students[index];
    } else {
      this.state = {
        id: '',
        name: '',
        lastName: '',
        direction: 'Выберите технологию',
        education: '',
        start: '',
        age: '',
      };
    }

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeLastName = this.handleChangeLastName.bind(this);
    this.handleChangeDirection = this.handleChangeDirection.bind(this);
    this.handleChangeEducation = this.handleChangeEducation.bind(this);
    this.handleChangeStart = this.handleChangeStart.bind(this);
    this.handleChangeAge = this.handleChangeAge.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeName(event) {
    this.setState({ name: event.target.value });
    if (!students || students.length === 0) {
      this.setState({ id: '1' });
    } else if (!this.props.id) {
      let id = Number(students[students.length - 1].id);
      this.setState({ id: `${id + 1}` });
    }
  }

  handleChangeLastName(event) {
    this.setState({ lastName: event.target.value });
  }

  handleChangeDirection(event) {
    this.setState({ direction: event.target.value });
  }

  handleChangeEducation(event) {
    this.setState({ education: event.target.value });
  }

  handleChangeStart(event) {
    this.setState({ start: event.target.value });
  }

  handleChangeAge(event) {
    this.setState({ age: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.props.id) {
      students[index] = this.state;
      setStudents(students);
    } else {
      if (!students || students.length === 0) {
        setStudents([this.state]);
      } else {
        setStudents(students.concat([this.state]));
      }
    }
    this.props.newStateMembers();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className='form-group'>
          <label>
            Имя:
            <input
              type='text'
              value={this.state.name}
              onChange={this.handleChangeName}
              className='form-control'
              required
            />
          </label>
        </div>
        <div className='form-group'>
          <label>
            Фамилия:
            <input
              type='text'
              value={this.state.lastName}
              onChange={this.handleChangeLastName}
              className='form-control'
              required
            />
          </label>
        </div>
        <div className='form-group'>
          <label>
            Выберите ваше направление:
            <select
              value={this.state.direction}
              onChange={this.handleChangeDirection}
              className='form-control'
            >
              <option value='#'>Выберите направление</option>
              <option value='Java'>Java</option>
              <option value='JavaScript'>JavaScript</option>
              <option value='.NET'>.NET</option>
              <option value='SalesForce'>SalesForce</option>
            </select>
          </label>
        </div>
        <div className='form-group'>
          <label>
            Образование:
            <input
              type='text'
              value={this.state.education}
              onChange={this.handleChangeEducation}
              className='form-control'
            />
          </label>
        </div>
        <div className='form-group'>
          <label>
            Дата начала:
            <input
              type='date'
              value={this.state.start}
              onChange={this.handleChangeStart}
              className='form-control'
            />
          </label>
        </div>
        <div className='form-group'>
          <label>
            Возраст:
            <input
              type='number'
              value={this.state.age}
              onChange={this.handleChangeAge}
              className='form-control'
            />
          </label>
        </div>
        <div className='form-group'>
          <Button name='Save' type='submit' />
        </div>
      </form>
    );
  }
}

export default Form;
