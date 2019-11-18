import React from "react";

const CategoryList = props => {
  const { items, onClickedAddCategory, selectedItem, onItemSelect } = props;
  return (
    <ul className="list-group ">
      <div className="input-group row justify-content-between">
        {items.map((item, index) => (
          <React.Fragment key={index + 1}>
            <li
              onClick={() => onItemSelect(item)}
              className={
                item === selectedItem
                  ? "list-group-item  active border-0 nounderline category-li col-9"
                  : "list-group-item  border-0 nounderline category-li col-9"
              }
            >
              {item.name}
            </li>
            <button type="button" className="btn col-2 p">
              <i className="fa fa-trash" aria-hidden="true " />
            </button>
          </React.Fragment>
        ))}
      </div>
      <div className="dropdown-divider" />
      <div className="input-group row justify-content-between">
        <input
          type="text"
          className="form-control  rounded border-0 col-9 category-input"
          placeholder="New List"
          aria-label="new-category"
          aria-describedby="basic-addon2"
        />
        <button
          onClick={() => {
            onClickedAddCategory(
              document.querySelector(".category-input").value
            );
          }}
          className="btn col-2"
        >
          <i className="fa fa-plus" aria-hidden="true" />
        </button>
      </div>
    </ul>
  );
};

export default CategoryList;
