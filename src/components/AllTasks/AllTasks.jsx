import React from 'react';
import Storage from '../Storage.js';
import RowHeader from '../GeneralComponents/RowHeader/RowHeader.jsx';
import Row from '../GeneralComponents/Row/Row.jsx';
import Popup from '../Popup/Popup.js';
import TasksForm from '../Form/TasksForm.jsx';
import './AllTasks.css';
import { Table, Button } from 'reactstrap';

const HEADER_CELLS = [
  'id',
  'taskName',
  'start',
  'deadline',
  '',
];

class AllTasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleClick = this.handleClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    const tasks = Storage().getTasks();
    this.setState({ tasks });
  }

  handleClick() {
    const tasks = Storage().getTasks();
    this.setState({ tasks });
  }

  handleDelete(event) {
    Storage().deleteTasks(parseInt(event.target.id))
    const tasks = Storage().getTasks();
    this.setState({ tasks });
  }

  render() {
    const { tasks } = this.state;

    if (!tasks || tasks.length === 0) {
      return (
        <div className='container'>
          <Popup
            className='btn btn-outline-primary btn-block'
            name='Create'
            form={<TasksForm setNewTasks={this.handleClick} />}
          />
          <p className='text'>No tasks</p>
        </div>
      );
    } 

    let listItems = tasks.map(task => {
      return (
        <Row
          cells={task}
          headerСells={HEADER_CELLS}
          key={task.id}
          elements={[
            <Popup
              key={`${task.id}-1`}
              name='Edit'
              form={<TasksForm setNewTasks={this.handleClick} id={task.id} />}
            />,
            <Button 
              outline 
              color="danger" 
              id={task.id}
              key={`${task.id}-2`}
              onClick={this.handleDelete} 
            >
              Delete
            </Button>,
          ]}
        />
      )
    });
    return (
        <div className='container'>
          <Popup
            name='Create'
            form={<TasksForm setNewTasks={this.handleClick} 
            />}
          />
          <Table hover>
            <thead>
              <RowHeader cells={HEADER_CELLS} />
            </thead>
            <tbody>{listItems}</tbody>
          </Table>
        </div>
    );
  }
}


export default AllTasks;
