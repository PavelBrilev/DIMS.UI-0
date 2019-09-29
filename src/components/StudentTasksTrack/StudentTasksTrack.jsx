import React from 'react';
import storage from '../Storage.js';
import Popup from '../Popup/Popup.js';
import TasksTrackForm from '../Form/TasksTrackForm.jsx';
import { Table, Button } from 'reactstrap';

class StudentTasksTrack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    const tasks = storage.getTasks();
    this.setState({ tasks });
  }

  handleDelete(event) {
    storage.deleteTasks(parseInt(event.target.id))
    this.componentDidMount();
  }

  render() {
    const { tasks } = this.state;

    if (!tasks || tasks.length === 0) {
      return (
        <div className='container'>
          <p className='text'>No tasks</p>
        </div>
      );
    } 

    let listItems = tasks.map(task => {
      return (
        <tr key={task.id}>
          <td >{tasks.indexOf(task)+1}</td>
          <td >{task.taskName}</td>
          <td >{task.note}</td>
          <td >{task.doneDate}</td>
          <td >
            <Popup
              key={`${task.id}-1`}
              name='Edit' >
              <TasksTrackForm setNewTasks={this.componentDidMount} id={task.id} />
            </Popup>
            <Button 
              outline 
              color="danger" 
              id={task.id}
              key={`${task.id}-2`}
              onClick={this.handleDelete} 
            >
              Delete
            </Button>
          </td>
        </tr>
      )
    });
    return (
        <div className='container'>
          <Table hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Note</th>
                <th>Done date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>{listItems}</tbody>
          </Table>
        </div>
    );
  }
}


export default StudentTasksTrack;
