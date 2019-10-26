import React, { useRef, useState, useCallback } from 'react';
// import HTML5Backend from 'react-dnd-html5-backend';
// import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { Table } from 'reactstrap';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import Popup from '../popup/Popup';
import TasksForm from '../common/forms/tasks-form/TasksForm';
import { Consumer } from '../../App';
import { icons } from '../common/icons';
import storage from '../../storage';
import Task from './Task';

import '../../styles/styles.css';

const AllTasks = () => {
  const [tasks, setTasks] = useState(storage.getTasks());
  const moveTask = useCallback(
    (dragIndex, hoverIndex) => {
      const dragTask = tasks[dragIndex];
      setTasks(
        update(tasks, {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragTask]],
        }),
      );
    },
    [tasks],
  );
  const renderTask = (task, index) => {
    return (
      <Task
        tasks={tasks}
        setTasks={setTasks}
        task={task}
        key={task.id}
        index={index}
        id={task.id}
        moveTask={moveTask}
      />
    );
  };
  if (!tasks || tasks.length === 0) {
    return (
      // <DndProvider backend={HTML5Backend}>
      <div className='container'>
        <Popup
          className='btn btn-outline-primary btn-block'
          icon={icons.create}
          name='Create'
        >
          <TasksForm setNewTasks={(task) => setTasks(tasks.concat(task))} />
        </Popup>
        <p className='text'>No tasks</p>
      </div>
      // </DndProvider>
    );
  }
  return (
    // <DndProvider backend={HTML5Backend}>
    <div className='container'>
      <Popup name='Create'>
        <TasksForm setNewTasks={(task) => setTasks(tasks.concat(task))} />
      </Popup>
      <Consumer>
        {(theme) => (
          // <DndProvider backend={HTML5Backend}>
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
            <tbody>{tasks.map((task, i) => renderTask(task, i))}</tbody>
          </Table>
          //</DndProvider>
        )}
      </Consumer>
    </div>
    // </DndProvider>
  );
};

export default AllTasks;

AllTasks.propTypes = {
  tasks: PropTypes.array,
  addTasks: PropTypes.func,
  delTasks: PropTypes.func,
  editTasks: PropTypes.func,
};
