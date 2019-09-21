import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import AllStudents from './components/AllStudents/AllStudents.jsx';
import Storage from './components/Storage.js';
import Header from './components/Header/Header.js';
import StudentTasks from './components/StudentTasks/StudentTasks.jsx';
import StudentDoneTasks from './components/StudentDoneTasks/StudentDoneTasks.jsx';

class App extends React.Component {

  render() {
    return (
      <div>
        <Router>
          <Header />
          <Route exact path="/students" component={AllStudents} />
          <Route path="/tasks" component={AllStudents} /> 
          <Route exact path="/students/:studentId/doneTasks" component={StudentTasks} /> 
          <Route exact path="/students/:studentId/tasks" component={StudentDoneTasks} /> 
        </Router>
      </div>
      );
  }
}

export default App;
