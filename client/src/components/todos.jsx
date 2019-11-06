import React, { Component } from "react";
import ListsDropDown from "./listDropDown";
import TaskList from "./taskList";
import TaskForm from "./taskForm";
import { getLists } from "../services/fakeListService";
import { getTasks } from "../services/fakeTaskService";
import DatePicker from "react-datepicker";

const axios = require("axios");

class ToDos extends Component {
  state = {
    tasks: [],
    lists: [],
    selectedList: {},
    selectedTask: {}
  };

  componentDidMount() {
    //const lists = [{ name: "All Tasks" }, ...getLists()];
    axios
      .get("http://localhost:5000/api/lists")
      .then(res => {
        const lists = res.data;
        const newLists = [{ name: "All Taks" }, ...lists];
        this.setState({ lists: newLists, selectedList: lists[0] });
      })
      .catch(err => console.log(err));
    const tasks = getTasks();
    //const selectedList = lists[0];

    this.setState({
      /*lists: lists,*/ tasks: tasks
      /*selectedList: selectedList*/
    });
  }

  handleTimeChange = date => {
    this.setState({
      startDate: date
    });
  };

  handelAddTask = inputElement => {
    console.log(inputElement);
    console.log(this.state.selectedList);
    const tasks = [...this.state.tasks];
    if (inputElement.value.length > 0) {
      const newTask = {
        _id: tasks[tasks.length - 1]._id + 1,
        title: inputElement.value,
        list: { ...this.state.selectedList }
      };

      tasks.push(newTask);
      inputElement.value = "";
      this.setState({ tasks });
    }
  };

  handelListMenuIcon = () => {
    var x = document.querySelector(".list-group");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  };

  handelTaskClicked = task => {
    const newTask = task;
    console.log(newTask);
    this.setState({ selectedTask: newTask });
  };

  handelDeleteTask = task => {
    const tasks = [...this.state.tasks].filter(t => t._id !== task._id);
    const selectedTask =
      task._id === this.state.selectedTask._id ? {} : this.state.selectedTask;
    this.setState({ tasks, selectedTask: selectedTask });
  };

  filteredTaskByList = () => {
    return this.state.selectedList !== this.state.lists[0] &&
      this.state.selectedList._id
      ? this.state.tasks.filter(
          task => task.list._id === this.state.selectedList._id
        )
      : this.state.tasks;
  };

  handelListSelect = item => {
    const selectedList = item;
    const selectedTask = {};
    this.setState({ selectedList, selectedTask });
  };

  handelAddList = inputElement => {
    if (inputElement.value.length > 0) {
      const lists = [...this.state.lists];
      const id = lists.length === 0 ? 0 : lists[lists.length - 1]._id + 1;
      const newList = {
        name: inputElement.value,
        _id: id
      };
      lists.push(newList);
      inputElement.value = "";
      this.setState({ lists: lists });
    }
  };
  render() {
    const filtered = this.filteredTaskByList();
    return (
      <React.Fragment>
        <div>
          <i
            className="fa fa-bars fa-2x"
            aria-hidden="true"
            onClick={this.handelListMenuIcon}
          />
        </div>
        <div className="row">
          <div className="col-md-3 list-group p-3 mb-2 ">
            <ListsDropDown
              items={this.state.lists}
              onItemSelect={this.handelListSelect}
              onClickedAddList={this.handelAddList}
              selectedItem={this.state.selectedList}
            />
          </div>
          <div className="col-md p-3 mb-2 bg-light text-dark">
            <div className="container">
              <h3>{this.state.selectedList.name}</h3>

              <div className="row">
                <div className="col-md-5 shadow-sm p-3 mb-3 bg-white rounded ">
                  <TaskList
                    items={filtered}
                    onDeleteItem={this.handelDeleteTask}
                    OnClickedItem={this.handelTaskClicked}
                    onClickedAddTask={this.handelAddTask}
                  />
                </div>
                {/* <div className="col-md-1" /> */}
                {Object.keys(this.state.selectedTask).length !== 0 ? (
                  <div className="col-md-5 offset-1 shadow-sm p-3 mb-3 bg-white rounded">
                    <TaskForm item={this.state.selectedTask} />
                  </div>
                ) : (
                  <div className="col-md-5" />
                )}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ToDos;
