import React from 'react';
import { Table, Button } from 'reactstrap';
import storage from '../../storage';
import Popup from '../popup/Popup';
import TasksTrackForm from '../common/forms/tasks-track-from/TasksTrackForm';
import { Consumer } from '../../App';
import { icons } from '../common/icons';

import '../../styles/styles.css';

class StudentTasksTrack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.initTasksTrack();
  }

  initTasksTrack = () => {
    const tasks = storage.getTasks();
    this.setState({ tasks });
  };

  handleDelete = (event) => {
    storage.deleteTasks(parseInt(event.target.id));
    this.initTasksTrack();
  };

  render() {
    const { tasks } = this.state;

    if (!tasks || tasks.length === 0) {
      return (
        <div className='container'>
          <p className='text'>No tasks</p>
        </div>
      );
    }

    let listItems = tasks.map((task) => {
      return (
        <tr key={task.id}>
          <td>{tasks.indexOf(task) + 1}</td>
          <td>{task.taskName}</td>
          <td>{task.note}</td>
          <td>{task.doneDate}</td>
          <td>
            <Popup key={`${task.id}-1`} icon={icons.editIcon} name='Edit'>
              <TasksTrackForm setNewTasks={this.initTasksTrack} id={task.id} />
            </Popup>
            <Button
              outline
              color='danger'
              id={task.id}
              key={`${task.id}-2`}
              onClick={this.handleDelete}
            >
              {icons.deleteIcon}
              Delete
            </Button>
          </td>
        </tr>
      );
    });
    return (
      <div className='container'>
        <Consumer>
          {(theme) => (
            <Table hover id={`${theme}`}>
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
          )}
        </Consumer>
      </div>
    );
  }
}

export default StudentTasksTrack;
