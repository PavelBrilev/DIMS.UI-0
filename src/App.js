import React from 'react';
import './App.css';
import AllStudents from './components/AllStudents/AllStudents.jsx';
import StudentTasks from './components/StudentTasks/StudentTasks.jsx';
import StudentDoneTasks from './components/StudentDoneTasks/StudentDoneTasks.jsx';
import Storage from './components/Storage.js';
import Header from './components/Header/Header.js';
import { BrowserRouter as Router, Route } from "react-router-dom";

let storage = Storage();
let students = storage.getStorage();
let studentsTasksRoutes = [];


class App extends React.Component {
  render() {
    if (students) {
      for (let i = 0; i < students.length; i++) {
        studentsTasksRoutes.push(
        <>
         <Route  path={`/studentsTasks/${students[i].id}`} render={()=><StudentTasks id={students[i].id} />}  />
         <Route  path={`/studentsDoneTasks/${students[i].id}`} render={()=><StudentDoneTasks id={students[i].id} />}  />
        </>
        )
     }
    }

  return (
    <div>
      <Router>
      <Header />
        <Route  path="/students" component={AllStudents} />
        <Route  path="/tasks" component={AllStudents} /> 
          {studentsTasksRoutes}
      </Router>
    </div>
  );
  }
}

export default App;
