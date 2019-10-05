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
import storage, { Roles as ROLES } from './components/Storage.js';

const { Provider, Consumer } = React.createContext({ color: 'gray' });

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const students = storage.getStudents();
    this.setState({ students });
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
        <div>
          <Router>
            <Provider>
              <Header />
            </Provider>
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
      );
    }
    if (this.state.role === ROLES.MENTOR) {
      return (
        <div>
          <Router>
            <Provider value='green'>
              <Header />
            </Provider>
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
      );
    }
    if (this.state.role === ROLES.STUDENT) {
      return (
        <div>
          <Router>
            <Provider value='blue'>
              <Header />
            </Provider>
            <Route
              exact
              path='/'
              render={() => <LoginPage auth={this.handleUserInput} />}
            />
            <Route path='/tasksTrack' component={StudentTasksTrack} />
          </Router>
        </div>
      );
    }
    return <LoginPage auth={this.handleUserInput} />;
  }
}

export { App, Consumer };
