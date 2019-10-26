import React, { useRef, useState, useCallback } from 'react';
import Popup from '../popup/Popup';
import TasksForm from '../forms/TasksForm';
import DeleteForm from '../forms/DeleteForm';
import '../../styles/styles.css';
import { Table } from 'reactstrap';
import { Consumer } from '../../App';
import PropTypes from 'prop-types';
import { icons } from '../../styles/icons';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { useDrag, useDrop } from 'react-dnd';
import update from 'immutability-helper'
import storage from '../../Storage';

const ItemTypes = {
  TASK: 'task'
}

const style = {
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  cursor: 'grab',
}

const Task = ({ id, task, index, moveTask, setTasks, tasks }) => {
  const ref = useRef(null)
  const [, drop] = useDrop({
    accept: ItemTypes.TASK,
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      if (dragIndex === hoverIndex) {
        return
      }
      const hoverBoundingRect = ref.current.getBoundingClientRect()
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      moveTask(dragIndex, hoverIndex)
      item.index = hoverIndex
    },
  })
  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.TASK, id, index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  })
  const opacity = isDragging ? 0.3 : 1
  drag(drop(ref))
  return (
    <tr key={task.id} ref={ref} style={{ ...style, opacity }}>
      <td >{task.id}</td>
      <td >{task.taskName}</td>
      <td >{task.start}</td>
      <td >{task.deadline}</td>
      <td >
        <Popup
          key={`${task.id}-1`}
          icon={icons.editIcon}
          name='Edit' >
          <TasksForm 
            setNewTasks={(task) => setTasks(tasks.map(item => {
              if(item.id === task.id) 
                {item = task}
                 return item;
              }))} 
            id={task.id} />
        </Popup>
        <Popup 
          className='btn btn-outline-danger'
          icon={icons.deleteIcon}
          name = 'Delete'
          id={task.id}
          key={`${task.id}-2`}
        >
          <DeleteForm 
            type='task' 
            setNewState={(task) => setTasks((tasks.filter((item) => item.id !== task)))} 
            id={task.id} 
            name={task.taskName}/>
        </Popup>
      </td>
    </tr>
  )
}

const AllTasks = () => {
    const [tasks, setTasks] = useState(storage.getTasks())
    const moveTask = useCallback(
      (dragIndex, hoverIndex) => {
        const dragTask = tasks[dragIndex]
        setTasks(
          update(tasks, {
            $splice: [[dragIndex, 1], [hoverIndex, 0, dragTask]],
          }),
        )
      },
      [tasks],
    )
    const renderTask = (task, index) => {
      return (
         <Task 
          tasks={tasks}
          setTasks={setTasks}
          task={task}           
          key={task.id}
          index={index}
          id={task.id}
          moveTask={moveTask}/>
      )
    }
    if (!tasks || tasks.length === 0) {
      return (
        <DndProvider backend={HTML5Backend}>
        <div className='container'>
          <Popup
            className='btn btn-outline-primary btn-block'
            icon={icons.create}
            name='Create'>
            <TasksForm setNewTasks={(task) => setTasks(tasks.concat(task))}/>
          </Popup>
          <p className='text'>No tasks</p>
        </div>
        </DndProvider>
      );
    } else {
    return (
      <DndProvider backend={HTML5Backend}>
      <div className='container'>
          <Popup
            name='Create'>
            <TasksForm setNewTasks={(task) => setTasks(tasks.concat(task))}/>
          </Popup>
          <Consumer>
              {theme => (
            <DndProvider backend={HTML5Backend}>
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
            </DndProvider>
          )}
        </Consumer>
        </div>
        </DndProvider>
    )
  }
}


export default AllTasks;

AllTasks.propTypes = {
  tasks: PropTypes.array,
  addTasks: PropTypes.func,
  delTasks: PropTypes.func,
  editTasks: PropTypes.func
};
