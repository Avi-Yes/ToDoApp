import React from "react";

const ListsDropDown = props => {
  const { items, onClickedAddList, selectedItem, onItemSelect } = props;
  return (
    <ul className="list-group">
      {items.map((item, index) => (
        <div key={index} className="input-group row justify-content-between">
          <li
            onClick={() => onItemSelect(item)}
            className={
              item === selectedItem
                ? "list-group-item  active border-0 nounderline list-li col-9"
                : "list-group-item  border-0 nounderline list-li col-9"
            }
          >
            {item.name}
          </li>
          <button type="button" className="btn col-2 p">
            <i className="fa fa-trash" aria-hidden="true " />
          </button>
        </div>
      ))}
      <div className="dropdown-divider" />
      <div className="input-group row justify-content-between">
        <input
          type="text"
          className="form-control  rounded border-0 col-9 list-input"
          placeholder="New List"
          aria-label="new-list"
          aria-describedby="basic-addon2"
        />
        <button
          onClick={() => {
            onClickedAddList(document.querySelector(".list-input"));
          }}
          className="btn col-2"
        >
          <i className="fa fa-plus" aria-hidden="true" />
        </button>
      </div>
    </ul>
  );
};

export default ListsDropDown;
