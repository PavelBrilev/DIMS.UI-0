import React from 'react';
import { Table } from 'reactstrap';
import PropTypes from 'prop-types';
import Popup from '../popup/Popup';
import TasksForm from '../common/forms/tasks-form/TasksForm';
import { icons } from '../common/icons';
import { ThemeContext } from '../../context/ThemeContext';
import { connect } from 'react-redux';
import DeleteForm from '../common/forms/delete-form/DeleteForm';
import { fetchTasks, addTask, editTask } from '../../reducers/tasksActions';
import Thead from './Thead';
import Tbody from './Tbody';

import '../../styles/styles.css';

class AllTasks extends React.Component {
  componentDidMount() {
    const { tasks, dispatch } = this.props;
    if (!tasks.length) {
      return dispatch(fetchTasks());
    }
  }

  listItems = (tasks) => {
    return tasks.map((task) => (
      <tr key={task.id}>
        <td>{tasks.indexOf(task) + 1}</td>
        <td>{task.taskName}</td>
        <td>{task.start}</td>
        <td>{task.deadline}</td>
        <td>
          <Popup key={`${task.id}-1`} icon={icons.editIcon} name='Edit'>
            <TasksForm
              setNewTask={(data) => this.props.dispatch(editTask(data))}
              id={task.id}
            />
          </Popup>
          <Popup
            className='btn btn-outline-danger'
            icon={icons.deleteIcon}
            name='Delete'
            key={`${task.id}-2`}
          >
            <DeleteForm type='task' id={task.id} name={task.Name} />
          </Popup>
        </td>
      </tr>
    ));
  };

  createPopUpForm = () => {
    return (
      <Popup
        className='btn btn-outline-primary btn-block'
        icon={icons.create}
        name='Create'
      >
        <TasksForm setNewTask={(data) => this.props.dispatch(addTask(data))} />
      </Popup>
    );
  };

  render() {
    const { Consumer } = ThemeContext;
    const { tasks } = this.props;

    if (!tasks || !tasks.length) {
      return (
        <div className='container'>
          {this.createPopUpForm()}
          <p className='text'>No tasks</p>
        </div>
      );
    }
    return (
      <div className='container'>
        {this.createPopUpForm()}
        <Consumer>
          {(theme) => (
            <Table hover id={`${theme}`}>
              <Thead />
              <Tbody>{this.listItems(tasks)}</Tbody>
            </Table>
          )}
        </Consumer>
      </div>
    );
  }
}

const mapStateToProps = ({ tasksState }) => ({
  tasks: tasksState.tasks,
  message: tasksState.message,
  errors: tasksState.errors,
});

export default connect(mapStateToProps)(AllTasks);

AllTasks.propTypes = {
  tasks: PropTypes.array,
  addTasks: PropTypes.func,
  delTasks: PropTypes.func,
  editTasks: PropTypes.func,
};
