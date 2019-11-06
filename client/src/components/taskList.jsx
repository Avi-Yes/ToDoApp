import React from "react";

const TaskList = props => {
  const { items, onDeleteItem, OnClickedItem, onClickedAddTask } = props;
  return (
    <ul className="list-group">
      {items.map(item => (
        <div key={item._id} className="input-group row">
          <div className="col-1" />
          <li
            onClick={() => OnClickedItem(item)}
            className="form-control rounded border-0 col-9 list-li li-hover"
          >
            {item.title}
          </li>
          <button
            onClick={() => onDeleteItem(item)}
            type="button"
            className="btn col-2"
          >
            <i className="fa fa-trash" aria-hidden="true" />
          </button>
        </div>
      ))}
      <div className="dropdown-divider" />
      <div className="input-group row">
        <div className="col-1" />

        <input
          type="text"
          className="form-control rounded border-0 col-9 task-input"
          placeholder="Add Task"
          aria-label="new-task"
          aria-describedby="basic-addon2"
        />
        <button
          onClick={() =>
            onClickedAddTask(document.querySelector(".task-input"))
          }
          className="btn col-2"
        >
          <i className="fa fa-plus" aria-hidden="true" />
        </button>
      </div>
    </ul>
  );
};

export default TaskList;
