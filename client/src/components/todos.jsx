import React, { Component } from "react";
import CategoryList from "./categoryList";
import TaskList from "./taskList";
import TaskForm from "./taskForm";
import { getLists } from "../services/fakeListService";
import { getTasks } from "../services/fakeTaskService";
import DatePicker from "react-datepicker";

const axios = require("axios");

class ToDos extends Component {
  state = {
    tasks: [],
    categories: [],
    selectedList: {},
    selectedTask: {}
  };

  componentDidMount() {
    //const categories = [{ name: "All Tasks" }, ...getLists()];
    axios
      .get("http://localhost:5000/api/categories")
      .then(res => {
        const categories = res.data;
        const categoreyList = [{ name: "All Taks" }, ...categories];
        this.setState({
          categories: categoreyList,
          selectedList: categoreyList[0]
        });
      })
      .catch(err => console.log(err));
    axios.get("http://localhost:5000/api/categories/tasks").then(result => {
      const tasks = result.data;
      this.setState({
        tasks: tasks
      });
    });
    //const selectedList = categories[0];
    // this.getAllCategories();
  }

  getAllCategories = async () => {
    try {
      const result = await axios.get("http://localhost:5000/api/categories");
      console.log(result);
    } catch (e) {
      console.log(e.message);
    }
  };

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
        category: { ...this.state.selectedList }
      };

      tasks.push(newTask);
      inputElement.value = "";
      this.setState({ tasks });
    }
  };

  handelListMenuIcon = () => {
    let categoryList = document.querySelector(".category-list");
    categoryList.style.display === "none"
      ? (categoryList.style.display = "block")
      : (categoryList.style.display = "none");
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
    console.log(typeof this.state.selectedList._id);
    return this.state.selectedList !== this.state.categories[0] &&
      this.state.selectedList._id
      ? this.state.selectedList.tasks
      : this.state.tasks;
  };

  handelListSelect = item => {
    console.log(item);
    const selectedList = item;
    const selectedTask = {};
    this.setState({ selectedList, selectedTask });
  };

  handelAddCategory = value => {
    if (value.length > 0) {
      const url = "http://localhost:5000/api/categories";
      const newCategorey = {
        name: value
      };
      axios({
        method: "post",
        url: url,
        data: newCategorey
      })
        .then(categorey => {
          console.log(categorey);
          const categories = [...this.state.categories];
          const newCategory = {
            name: categorey.data.name,
            _id: categorey.data._id
          };
          categories.push(newCategory);
          value = "";
          this.setState({ categories: categories });
        })
        .catch(err => console.log(err));
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
          <div className="col-md-3 list-group p-3 mb-2 category-list ">
            <CategoryList
              items={this.state.categories}
              onItemSelect={this.handelListSelect}
              onClickedAddCategory={this.handelAddCategory}
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
