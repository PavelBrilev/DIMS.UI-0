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


class App extends React.Component {

  render() {
    return (
      <div>
        <Router>
          <Header />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/students" component={AllStudents} />
          <Route path="/tasks" component={AllTasks} /> 
          <Route path="/students/:studentId/doneTasks" component={StudentDoneTasks} /> 
          <Route path="/students/:studentId/tasks" component={StudentTasks} /> 
          <Route path="/tasksTrack" component={StudentTasksTrack} /> 
        </Router>
      </div>
      );
  }
}

export default App;
