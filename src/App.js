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
import Storage from './components/Storage.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

  this.handleUserInput = this.handleUserInput.bind(this);
  }

  reload() {
    window.location.reload()
  }

  handleUserInput(props) {
    const students = Storage().getStudents();
    const result = students.find(item => item.name === props.login && item.password === props.password);
    if(result) {
      this.setState({ role: result.role })
    }
  };

render() {
  const students = Storage().getStudents();
  if(!students || students.length === 0) {
    return(
      <div className="container">
        <StudentsForm setNewStudent={this.reload}/>
      </div> 
    )}
    if(this.state.role === "admin") {
    return (
      <div>
        <Router>
          <Header />
          <Route exact path="/" render={() => <LoginPage auth={this.handleUserInput} />} />
          <Route exact path="/students" component={AllStudents} />
          <Route path="/tasks" component={AllTasks} /> 
          <Route path="/students/:studentId/doneTasks" component={StudentDoneTasks} /> 
          <Route path="/students/:studentId/tasks" component={StudentTasks} /> 
          <Route path="/tasksTrack" component={StudentTasksTrack} /> 
        </Router>
      </div>
      )}
    else if(this.state.role === "mentor") {
      return (
        <div>
          <Router>
            <Header />
            <Route exact path="/" render={() => <LoginPage auth={this.handleUserInput} />} />
            <Route path="/tasks" component={AllTasks} /> 
            <Route path="/students/:studentId/doneTasks" component={StudentDoneTasks} /> 
            <Route path="/students/:studentId/tasks" component={StudentTasks} /> 
          </Router>
        </div>
        )}
    else if(this.state.role === "student") {
      return (
        <div>
          <Router>
            <Header />
            <Route exact path="/" render={() => <LoginPage auth={this.handleUserInput} />} />
            <Route path="/tasksTrack" component={StudentTasksTrack} /> 
          </Router>
        </div>
        )} 
      return(
        <LoginPage auth={this.handleUserInput} />
      )
      
  }
}

export default App;
