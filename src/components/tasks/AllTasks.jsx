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

  render() {
    const tasks = this.props.tasks;
    if (!tasks || tasks.length === 0) {
      return (
        <div className='container'>
          <Popup
            className='btn btn-outline-primary btn-block'
            name='Create'>
            <TasksForm setNewTasks={this.props.addTasks}/>
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
              <TasksForm setNewTasks={this.props.editTasks} id={task.id} />
            </Popup>
            <Popup 
              className='btn btn-outline-danger'
              name = 'Delete'
              id={task.id}
              key={`${task.id}-2`}
            >
              <DeleteForm type='task' setNewState={this.props.delTasks} id={task.id} name={task.taskName}/>
            </Popup>
          </td>
        </tr>
      )
    });
    return (
        <div className='container'>
          <Popup
            name='Create'>
            <TasksForm setNewTasks={this.props.addTasks}/> 
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

const mapStateToProps = (state) => {
  return {
    tasks: state.tasksState
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    addTasks: (task) => {
      dispatch({
        type: 'ADD_TASK',
        task: task
      });
    },
    delTasks: (taskId) => {
      dispatch({
        type: 'DEL_TASK',
        taskId: taskId
      });
    },
    editTasks: (updatedTask) => {
      dispatch({
        type: 'EDIT_TASK',
        updatedTask: updatedTask
      });
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllTasks);

AllTasks.propTypes = {
  tasks: PropTypes.array,
  addTasks: PropTypes.func,
  delTasks: PropTypes.func,
  editTasks: PropTypes.func
};
