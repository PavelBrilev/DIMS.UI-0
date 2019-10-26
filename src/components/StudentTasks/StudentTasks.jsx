import React from 'react';
import { Button, Table } from 'reactstrap';
import storage from '../../storage';
import Popup from '../popup/Popup';
import TasksTrackForm from '../forms/TasksTrackForm';
import '../../styles/styles.css';
import { Consumer } from '../../App';
import { icons } from '../common/icons';

class StudentTasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleClick = () => {
    const tasks = storage.getTasks();
    this.setState({ tasks });
  };

  render() {
    const studentId = parseInt(this.props.match.params.studentId);
    const student = storage.getStudent(studentId);
    const tasks = storage.getTasks();
    const tasksList = tasks.filter((item) => item.students.includes(studentId));
    const listItems = tasksList.map((task) => (
      <tr key={task.id}>
        <td>{tasksList.indexOf(task) + 1}</td>
        <td>{task.taskName}</td>
        <td>{task.start}</td>
        <td>{task.deadline}</td>
        <td>{task.status}</td>
        <td>
          <Popup key={`${task.id}-1`} icon={icons.editIcon} name='Edit'>
            <TasksTrackForm setNewTasks={this.handleClick} id={task.id} />
          </Popup>
        </td>
        <td>
          <Button key={`${task.id}-1`} outline color='success'>
            {icons.doneIcon}
            Success
          </Button>
          <Button key={`${task.id}-2`} outline color='danger'>
            {icons.cancelIcon}
            Fail
          </Button>
        </td>
      </tr>
    ));

    return (
      <div className='container'>
        <h5>
          Hi, dear
          {student.name}! This is your current tasks:
        </h5>
        <Consumer>
          {(theme) => (
            <Table hover id={`${theme}`}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Start</th>
                  <th>Deadline</th>
                  <th>Status</th>
                  <th />
                  <th />
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

export default StudentTasks;
