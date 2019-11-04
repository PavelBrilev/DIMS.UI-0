import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AllStudents from './components/students/AllStudents';
import AllTasks from './components/tasks/AllTasks';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import StudentTasks from './components/student-tasks/StudentTasks';
import StudentDoneTasks from './components/student-done-tasks/StudentDoneTasks';
import StudentTasksTrack from './components/student-tasks-track/StudentTasksTrack';
import LoginPage from './components/pages/LoginPage';
import { Roles as ROLES } from './storage';
import { ThemeContext } from './context/ThemeContext';
import BadSidebar from './components/sidebar/Sidebar';
import './styles/styles.css';

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      role: '',
      theme: 'white',
    };
  }

  handleTheme = (theme) => {
    this.setState({ theme });
  };

  handleUserInput = () => {
    this.state.role
      ? this.setState({ role: '' })
      : this.setState({ role: ROLES.ADMIN });
  };

  render() {
    const { Provider } = ThemeContext;

    if (this.state.role === ROLES.ADMIN) {
      return (
        <Provider value={this.state.theme}>
          <div className={`app_container ${this.state.theme}`}>
            <Router>
              <Header
                handleTheme={this.handleTheme}
                LogOut={this.handleUserInput}
              />
              <Route
                exact
                path='/'
                render={() => (
                  <LoginPage handleAuthorization={this.handleUserInput} />
                )}
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
            <Footer />
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
    return <LoginPage handleAuthorization={this.handleUserInput} />;
  }
}

export { App };
