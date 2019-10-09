import React from 'react';
import { Button, Table } from 'reactstrap';
import storage from '../../Storage';
import Popup from '../Popup/Popup.js';
import TasksTrackForm from '../Form/TasksTrackForm.jsx';

class StudentTasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleClick = () => {
    const tasks = storage.getTasks();
    this.setState({ tasks });
  }
  
  render() { 
    const studentId = parseInt(this.props.match.params.studentId);
    const student = storage.getStudent(studentId);
    const tasks = storage.getTasks();
    const tasksList = tasks.filter(item => item.students.includes(studentId));
    const listItems = tasksList.map((task) => (
        <tr key={task.id}>
          <td >{tasksList.indexOf(task)+1}</td>
          <td >{task.taskName} </td>
          <td >{task.start} </td>
          <td >{task.deadline} </td>
          <td >{task.status} </td>
          <td >
            <Popup
              key={`${task.id}-1`}
              name='Edit' >
              <TasksTrackForm setNewTasks={this.handleClick} id={task.id} />
            </Popup>
          </td>
          <td >
            <Button key={`${ task.id }-1`} outline color="success">Success</Button>
            <Button key={`${ task.id }-2`} outline color="danger">Fail</Button>
          </td>
        </tr>
    ))

  return (
    <div className='container'>
      <h5> Hi, dear {student.name}! This is your current tasks:</h5>
      <Table hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Start</th>
            <th>Deadline</th>
            <th>Status</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>{listItems}</tbody>
      </Table>
    </div>
  )
  }
}

export default StudentTasks;
