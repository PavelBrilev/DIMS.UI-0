import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import students from '../Students.js';
import './Popup.css';

var memberId;
var index;

class EditForm extends React.Component {
  constructor(props) {
    super(props);
    index = students.map((o) => o.id).indexOf(memberId);
    this.state = students[index];

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
    console.log(index);
    students[index] = this.state;
    localStorage.setItem('students', JSON.stringify(students));
    window.location.reload(true);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className='form-group'>
          <label>
            Имя:
            <input
              className='form-control'
              type='text'
              value={this.state.name}
              onChange={this.handleChangeName}
              required
            />
          </label>
        </div>
        <div className='form-group'>
          <label>
            Фамилия:
            <input
              className='form-control'
              type='text'
              value={this.state.lastName}
              onChange={this.handleChangeLastName}
              required
            />
          </label>
        </div>
        <div className='form-group'>
          <label>
            Выберите ваше направление:
            <select
              className='form-control'
              value={this.state.direction}
              onChange={this.handleChangeDirection}
            >
              <option value='#'>Выберите технологию</option>
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
              className='form-control'
              type='text'
              value={this.state.education}
              onChange={this.handleChangeEducation}
            />
          </label>
        </div>
        <div className='form-group'>
          <label>
            Дата начала:
            <input
              className='form-control'
              type='date'
              value={this.state.start}
              onChange={this.handleChangeStart}
            />
          </label>
        </div>
        <div className='form-group'>
          <label>
            Возраст:
            <input
              className='form-control'
              type='number'
              value={this.state.age}
              onChange={this.handleChangeAge}
            />
          </label>
        </div>
        <div className='form-group'>
          <Button variant='success' type='submit' className='form-control'>
            Save
          </Button>
        </div>
      </form>
    );
  }
}

function PopupEdit(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = function(event) {
    setShow(true);
    var target = event.target.parentNode.parentNode.firstChild;
    memberId = target.innerHTML;
  };

  return (
    <>
      <Button variant='outline-secondary' onClick={handleShow}>
        {props.name}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <EditForm memberId={memberId} />

        <Button variant='light' type='submit' onClick={handleClose}>
          Back to grid
        </Button>
      </Modal>
    </>
  );
}

export default PopupEdit;
