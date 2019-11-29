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
import { ThemeProvider } from './context/ThemeContext';
import { RoleProvider } from './context/RoleContext';
import Sidebar from './components/sidebar/Sidebar';
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

  handleUserInput = (props) => {
    this.state.role
      ? this.setState({ role: '' })
      : this.setState({ role: props.login });
  };

  render() {
    if (this.state.role) {
      return (
        <RoleProvider role={this.state.role}>
          <ThemeProvider color={this.state.theme}>
            <div className={`app_container ${this.state.theme}`}>
              <Router>
                <Header
                  handleTheme={this.handleTheme}
                  LogOut={this.handleUserInput}
                />
                <Sidebar />
                <Route
                  exact
                  path='/'
                  render={() => (
                    <LoginPage handleAuthorization={this.handleUserInput} />
                  )}
                  component={AllStudents}
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
          </ThemeProvider>
        </RoleProvider>
      );
    }
    return <LoginPage handleAuthorization={this.handleUserInput} />;
  }
}

export { App };
