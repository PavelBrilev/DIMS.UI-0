import React from 'react';
import { Table } from 'reactstrap';
import storage from '../../storage';
import { Consumer } from '../../App';

import '../../styles/styles.css';

class StudentDoneTasks extends React.Component {
  render() {
    const studentId = parseInt(this.props.match.params.studentId);
    const student = storage.getStudent(studentId);
    const tasks = storage.getTasks();
    const tasksList = tasks.filter((item) => item.students.includes(studentId));
    const listItems = tasksList.map((task) => (
      <tr key={task.id}>
        <td>{tasksList.indexOf(task) + 1}</td>
        <td>{task.taskName} </td>
        <td>{task.note} </td>
        <td>{task.doneDate} </td>
      </tr>
    ));

    return (
      <div className='container'>
        <h5> {student.name}'s progress:</h5>
        <Consumer>
          {(theme) => (
            <Table hover id={`${theme}`}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Task</th>
                  <th>Note</th>
                  <th>Done date</th>
                </tr>
              </thead>
              <tbody>{listItems}</tbody>
            </Table>
          )}
        </Consumer>
      </div>
    );
  }
}

export default StudentDoneTasks;
