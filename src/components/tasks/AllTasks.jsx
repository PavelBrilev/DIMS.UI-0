import React from 'react';
import Popup from '../popup/Popup';
import TasksForm from '../forms/TasksForm';
import DeleteForm from '../forms/DeleteForm';
import '../../styles/styles.css';
import { Table } from 'reactstrap';
import { Consumer } from '../../App';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

class AllTasks extends React.Component {

  initTasks = (task) => {
    this.props.fetchTasks(task);
  }

  render() {
    const tasks = this.props.tasks;
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
    tasks: state.tasksState
  }),
  dispatch => ({
    fetchTasks: (task) => {
      dispatch({
        type: 'ADD_TASK',
        task: task
      });
    }
  })
)(AllTasks);

AllTasks.propTypes = {
  tasks: PropTypes.array,
  fetchTasks: PropTypes.func
};
