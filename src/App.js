import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import AllStudents from './components/AllStudents/AllStudents.jsx';
import AllTasks from './components/AllTasks/AllTasks.jsx';
import Header from './components/Header/Header.js';
import StudentTasks from './components/StudentTasks/StudentTasks.jsx';
import StudentDoneTasks from './components/StudentDoneTasks/StudentDoneTasks.jsx';
import StudentTasksTrack from './components/StudentTasksTrack/StudentTasksTrack.jsx';
import LoginPage from './components/Form/LoginPage.jsx';
import StudentsForm from './components/Form/StudentsForm.jsx';
import storage from './components/Storage.js';

const {Provider, Consumer} = React.createContext();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

  this.handleUserInput = this.handleUserInput.bind(this);
  this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    const students = storage.getStudents();
    this.setState({ students })
  }

  handleUserInput(props) {
    const result = this.state.students.find(item => item.name === props.login && item.password === props.password);
    if(result) {
      this.setState({ role: result.role })
    }
  };

  render() {
    if(!this.state.students || this.state.students.length === 0) {
      return(
        <div className="container">
          <StudentsForm setNewStudent={this.componentDidMount}/>
        </div> 
      )}
      if(this.state.role === "admin") {
      return (
        <Provider value={'gray'}>
        <div>
          <Router>
            <Header/>
            <Route exact path="/" render={() => <LoginPage auth={this.handleUserInput} />} />
            <Route exact path="/students" component={AllStudents} />
            <Route path="/tasks" component={AllTasks} /> 
            <Route path="/students/:studentId/doneTasks" component={StudentDoneTasks} /> 
            <Route path="/students/:studentId/tasks" component={StudentTasks} /> 
            <Route path="/tasksTrack" component={StudentTasksTrack} /> 
          </Router>
        </div>
        </Provider>
        )}
      else if(this.state.role === "mentor") {
        return (
          <Provider value={'green'}>
          <div>
            <Router>
              <Header/>
              <Route exact path="/" render={() => <LoginPage auth={this.handleUserInput} />} />
              <Route path="/tasks" component={AllTasks} /> 
              <Route path="/students/:studentId/doneTasks" component={StudentDoneTasks} /> 
              <Route path="/students/:studentId/tasks" component={StudentTasks} /> 
            </Router>
          </div>
          </Provider>
          )}
      else if(this.state.role === "student") {
        return (
          <Provider value={'blue'}>
          <div>
            <Router>
              <Header/>
              <Route exact path="/" render={() => <LoginPage auth={this.handleUserInput} />} />
              <Route path="/tasksTrack" component={StudentTasksTrack} /> 
            </Router>
          </div>
          </Provider>
          )} 
        return(
          <LoginPage auth={this.handleUserInput} />
        )
        
    }
  }

export { App, Consumer};
