import React from 'react';
import { Button } from 'reactstrap';
import './style.css';
import { AvForm, AvGroup, AvField } from 'availity-reactstrap-validation';
import Storage from '../Storage.js';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
      };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { id } = this.props;
    if (id) {
      this.setState(Storage().getTask(id))
    }
  };

  handleChange (event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit() {
    Storage().saveTask(this.state);
    this.props.setNewTasks();
    this.props.toggle();

    return false
  }

  render() {
    return (
      <div>
      <div className='login__container'>
        <AvForm onValidSubmit={this.handleSubmit}>
          <AvGroup>
            <AvField name="login" type="text" label="Login" value={this.state.login} onChange={this.handleChange} validate={{
              required: {value: true, errorMessage: 'Please enter a login'},
              minLength: {value: 3, errorMessage: 'Your login must be between 3 and 16 characters'},
              maxLength: {value: 16, errorMessage: 'Your login must be between 3 and 16 characters'}
            }} />
          </AvGroup>
          <AvGroup>
            <AvField name="password" type="password" label="Password" value={this.state.password} onChange={this.handleChange} validate={{
              required: {value: true, errorMessage: 'Please enter a password'},
              minLength: {value: 3, errorMessage: 'Your password must be between 3 and 16 characters'},
              maxLength: {value: 16, errorMessage: 'Your password must be between 3 and 16 characters'}
            }} />
          </AvGroup>
          <Button outline type='submit' color="success" block>LogIn</Button>
          <Button outline color="danger" block>Back</Button>
        </AvForm>
      </div>
      </div>
    );
  }
}

export default LoginPage;
