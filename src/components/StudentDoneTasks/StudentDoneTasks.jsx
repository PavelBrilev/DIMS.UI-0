import React from 'react';
import { Table } from 'reactstrap';
import Storage from '../Storage.js';

class StudentDoneTasks extends React.Component {

  render() { 
    const studentId = parseInt(this.props.match.params.studentId);
    const student = Storage().getStudent(studentId);
    const tasks = Storage().getTasks();
    const tasksList = tasks.filter(item => item.students.includes(studentId));
    const listItems = tasksList.map((task) => (
        <tr key={task.id}>
          <td >{tasksList.indexOf(task)+1}</td>
          <td >{task.taskName} </td>
          <td >{task.note} </td>
          <td >{task.doneDate} </td>
        </tr>
    ));
  
  return (
    <div className='container'>
    <h5> {student.name}'s progress:</h5>
      <Table hover>
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
    </div>
  )
}
};


export default StudentDoneTasks;

