import React from 'react';
import storage from '../Storage.js';
import Popup from '../Popup/Popup.js';
import TasksForm from '../Form/TasksForm.jsx';
import './AllTasks.css';
import { Table, Button } from 'reactstrap';

class AllTasks extends React.Component {
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
    const tasks = storage.getTasks();
    this.setState({ tasks });
  }

  render() {
    const { tasks } = this.state;

    if (!tasks || tasks.length === 0) {
      return (
        <div className='container'>
          <Popup
            className='btn btn-outline-primary btn-block'
            name='Create'>
            <TasksForm setNewTasks={this.componentDidMount}/>
          </Popup>
          <p className='text'>No tasks</p>
        </div>
      );
    } 

    let listItems = tasks.map(task => {
      return (
        <tr key={task.id}>
          <td >{tasks.indexOf(task)+1}</td>
          <td >{task.taskName}</td>
          <td >{task.start}</td>
          <td >{task.deadline}</td>
          <td >
            <Popup
              key={`${task.id}-1`}
              name='Edit' >
              <TasksForm setNewTasks={this.componentDidMount} id={task.id} />
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
          <Popup
            name='Create'>
            <TasksForm setNewTasks={this.componentDidMount}/> 
          </Popup>
          <Table hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Start</th>
                <th>Deadline</th>
                <th></th>
              </tr>
            </thead>
            <tbody>{listItems}</tbody>
          </Table>
        </div>
    );
  }
}


export default AllTasks;
