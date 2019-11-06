import React from "react";
const TaskForm = props => {
  const { item } = props;
  return (
    <form className="task">
      <div className="form-row justify-content-between">
        <div className="col-9">
          <input
            onChange={e => {
              console.log(e.target.value);
            }}
            type="text"
            className="font-weight-bold form-control bg-light border-0 form-control-sm 
"
            value={item.title}
            onChange={e => {
              item.title = e.target.value;
            }}
          ></input>
        </div>
        <div className="col-3">
          <button type="button" className="btn form-control">
            <i className="fa fa-pencil" aria-hidden="true"></i>
          </button>
        </div>
      </div>
      <div className="form-group">
        <textarea
          className="form-control bg-light border-0
"
          defaultValue="ADD NOTES"
        ></textarea>
      </div>
      <div className="form-group mr-1">
        <input className="task-btn form-control" type="date"></input>
      </div>

      <div className="form-group">
        <input className="task-btn form-control" type="time"></input>
      </div>
      <div className="form-group">
        <input className="form-control-file form-control-sm" type="file" />
      </div>
    </form>
  );
};

export default TaskForm;
