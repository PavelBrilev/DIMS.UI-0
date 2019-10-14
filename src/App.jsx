import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './Styles/styles.css';
import AllStudents from './components/AllStudents/AllStudents.jsx';
import AllTasks from './components/AllTasks/AllTasks.jsx';
import Header from './components/Header/Header.js';
import StudentTasks from './components/StudentTasks/StudentTasks.jsx';
import StudentDoneTasks from './components/StudentDoneTasks/StudentDoneTasks.jsx';
import StudentTasksTrack from './components/StudentTasksTrack/StudentTasksTrack.jsx';
import LoginPage from './components/Forms/LoginPage.jsx';
import StudentsForm from './components/Forms/StudentsForm.jsx';
import storage, { Roles as ROLES } from './Storage';

const {Provider, Consumer} = React.createContext('white');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    const students = storage.getStudents();
    this.setState({ students });
  }

  handleTheme = (theme) => {
    this.setState({ theme })
  }

  handleUserInput = (props) => {
    const result = this.state.students.find(
      (item) => item.name === props.login && item.password === props.password,
    );
    if (result) {
      this.setState({ role: result.role });
    }
  };

  render() {
    const { students } = this.state;

    if (!students || students.length === 0) {
      return (
        <div className='container'>
          <StudentsForm />
        </div>
      );
    }
    if (this.state.role === ROLES.ADMIN) {
      return (
      <Provider value={this.state.theme}>
        <div className={this.state.theme}>
          <Router>
              <Header handleTheme={this.handleTheme}/>
            <Route
              exact
              path='/'
              render={() => <LoginPage auth={this.handleUserInput} />}
            />
            <Route exact path='/students' component={AllStudents} />
            <Route path='/tasks' component={AllTasks} />
            <Route
              path='/students/:studentId/doneTasks'
              component={StudentDoneTasks}
            />
            <Route path='/students/:studentId/tasks' component={StudentTasks} />
            <Route path='/tasksTrack' component={StudentTasksTrack} />
          </Router>
          </div>
      </Provider>      
      );
    }
    if (this.state.role === ROLES.MENTOR) {
      return (
        <Provider value={this.state.theme}>
        <div className={this.state.theme}>
            <Router>
              <Header handleTheme={this.handleTheme}/>
            <Route
              exact
              path='/'
              render={() => <LoginPage auth={this.handleUserInput} />}
            />
            <Route path='/tasks' component={AllTasks} />
            <Route
              path='/students/:studentId/doneTasks'
              component={StudentDoneTasks}
            />
            <Route path='/students/:studentId/tasks' component={StudentTasks} />
          </Router>
          </div>
        </Provider>
      );
    }
    if (this.state.role === ROLES.STUDENT) {
      return (
        <Provider value={this.state.theme}>
        <div className={this.state.theme}>
          <Router>
              <Header handleTheme={this.handleTheme}/>
            <Route
              exact
              path='/'
              render={() => <LoginPage auth={this.handleUserInput} />}
            />
            <Route path='/tasksTrack' component={StudentTasksTrack} />
          </Router>
          </div>
        </Provider>
      );
    }
    return <LoginPage auth={this.handleUserInput} />;
  }
}

export  { App, Consumer };
