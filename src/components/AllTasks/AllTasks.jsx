import React from 'react';
import storage from '../../Storage';
import Popup from '../Popup/Popup.js';
import TasksForm from '../Forms/TasksForm.jsx';
import DeleteForm from '../Forms/DeleteForm.jsx';
import '../../Styles/styles.css';
import { Table } from 'reactstrap';
import { Consumer } from '../../App';
import { connect } from 'react-redux'

class AllTasks extends React.Component {

  initTasks = () => {
    const tasks = storage.getTasks();
    this.props.onTasks(tasks);
  }

  render() {
    const tasks = this.props.allTasks;

    if (!tasks || tasks.length === 0) {
      return (
        <div className='container'>
          <Popup
            className='btn btn-outline-primary btn-block'
            name='Create'>
            <TasksForm setNewTasks={this.initTasks}/>
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
              <TasksForm setNewTasks={this.initTasks} id={task.id} />
            </Popup>
            <Popup 
              className='btn btn-outline-danger'
              name = 'Delete'
              id={task.id}
              key={`${task.id}-2`}
            >
              <DeleteForm type='task' setNewState={this.initTasks} id={task.id} name={task.taskName}/>
            </Popup>
          </td>
        </tr>
      )
    });
    return (
        <div className='container'>
          <Popup
            name='Create'>
            <TasksForm setNewTasks={this.initTasks}/> 
          </Popup>
          <Consumer>
              {theme => (
            <Table hover id={`${theme}`}>
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
          )}
        </Consumer>
        </div>
    );
  }
}


export default connect(
  state => ({
    allTasks: state.tasksState
  }),
  dispatch => ({
    onTasks: (tasks) => {
      dispatch({
        type: 'TASKS_LIST_SUCCESS',
        allTasks: tasks
      });
    }
  })
)(AllTasks);
