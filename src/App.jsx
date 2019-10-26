import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AllStudents from './components/students/AllStudents';
import AllTasks from './components/tasks/AllTasks';
import Header from './components/header/Header';
import StudentTasks from './components/studentTasks/StudentTasks';
import StudentDoneTasks from './components/studentDoneTasks/StudentDoneTasks';
import StudentTasksTrack from './components/studentTasksTrack/StudentTasksTrack';
import LoginPage from './components/pages/LoginPage';
import storage, { Roles as ROLES } from './storage';

import './styles/styles.css';

const { Provider, Consumer } = React.createContext('white');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      role: ROLES.ADMIN,
      theme: '',
    };
  }

  componentDidMount() {
    const students = storage.getStudentsLocal();
    this.setState({ students });
  }

  handleTheme = (theme) => {
    this.setState({ theme });
  };

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

    if (this.state.role === ROLES.ADMIN) {
      return (
        <Provider value={this.state.theme}>
          <div className={this.state.theme}>
            <Router>
              <Header handleTheme={this.handleTheme} />
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
              <Route
                path='/students/:studentId/tasks'
                component={StudentTasks}
              />
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
              <Header handleTheme={this.handleTheme} />
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
              <Route
                path='/students/:studentId/tasks'
                component={StudentTasks}
              />
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
              <Header handleTheme={this.handleTheme} />
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

export { App, Consumer };
