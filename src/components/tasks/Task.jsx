import React, { useRef } from 'react';
// import HTML5Backend from 'react-dnd-html5-backend';
import { useDrag, useDrop } from 'react-dnd';
import PropTypes from 'prop-types';
import Popup from '../popup/Popup';
import TasksForm from '../common/forms/tasks-form/TasksForm';
import DeleteForm from '../common/forms/delete-form/DeleteForm';
import { icons } from '../common/icons';
import { ItemTypes } from './item-types';

const style = {
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  cursor: 'grab',
};

const Task = ({ id, task, index, moveTask, setTasks, tasks }) => {
  const ref = useRef(null);
  const [, drop] = useDrop({
    accept: ItemTypes.TASK,
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveTask(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.TASK, id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0.3 : 1;
  drag(drop(ref));
  return (
    <tr key={task.id} ref={ref} style={{ ...style, opacity }}>
      <td>{task.id}</td>
      <td>{task.taskName}</td>
      <td>{task.start}</td>
      <td>{task.deadline}</td>
      <td>
        <Popup key={`${task.id}-1`} icon={icons.editIcon} name='Edit'>
          <TasksForm
            setNewTasks={(task) =>
              setTasks(
                tasks.map((item) => {
                  if (item.id === task.id) {
                    item = task;
                  }
                  return item;
                }),
              )
            }
            id={task.id}
          />
        </Popup>
        <Popup
          className='btn btn-outline-danger'
          icon={icons.deleteIcon}
          name='Delete'
          id={task.id}
          key={`${task.id}-2`}
        >
          <DeleteForm
            type='task'
            setNewState={(task) =>
              setTasks(tasks.filter((item) => item.id !== task))
            }
            id={task.id}
            name={task.taskName}
          />
        </Popup>
      </td>
    </tr>
  );
};

export default Task;
