import React from 'react';
import { Button } from 'reactstrap';
import './style.css';
import { AvForm, AvGroup, AvField } from 'availity-reactstrap-validation';
import { connect } from 'react-redux'
import storage from '../../Storage'
import axios from 'axios';
import { icons } from '../../styles/icons'


class LoginPage extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        login: '',
        password: ''
      };
  }

  handleChange = (event) => {
    const { target } = event;
    const { value, name } = target;
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.auth(this.state);
    this.props.addStudents();
  }

  clearForm = () => {
    this.setState({ login: '',
                    password: ''});
  }

  render() {
    return (
      <div className='login__container'>
        <AvForm onValidSubmit={this.handleSubmit}>
          <AvGroup>
            <AvField name="login" type="text" label="Login" value={this.state.login} onChange={this.handleChange} validate={{
              required: {value: true, errorMessage: 'Please enter login'},
              minLength: {value: 3, errorMessage: 'Your login must be between 3 and 16 characters'},
              maxLength: {value: 16, errorMessage: 'Your login must be between 3 and 16 characters'}
            }} />
          </AvGroup>
          <AvGroup>
            <AvField name="password" type="password" label="Password" value={this.state.password} onChange={this.handleChange} validate={{
              required: {value: true, errorMessage: 'Please enter password'},
              minLength: {value: 3, errorMessage: 'Your password must be between 3 and 16 characters'},
              maxLength: {value: 16, errorMessage: 'Your password must be between 3 and 16 characters'}
            }} />
          </AvGroup>
          <Button outline type='submit' color="success" block>{icons.submitIcon} LogIn</Button>
          <Button outline onClick={this.clearForm} color="danger" block> {icons.cancelIcon} Clear</Button>
        </AvForm>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    students: state.studentsState
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    addStudents: () => {
      const asyncGetStudents = () => {
          return (dispatch) => {
            
            axios
            .get(`${process.env.REACT_APP_BASE_URL}api/profiles`)
            .then((response) => {
              dispatch({ type: 'ADD_ALL_USERS', students: response.data });
            })
            .catch((error) => {
              console.log(error);
            });
          }
      }
      dispatch(asyncGetStudents());
    }    
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginPage);
