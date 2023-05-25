import React, { Component } from "react";
import Modal from "./components/Modal";
import axios from 'axios';  

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewCompleted: false,
      activeItem: {
        title: "",
        description: "",
        completed: false
      },
      taskList: []
    };
  }

  
  componentDidMount() {
    this.refreshList();
  }

 
  refreshList = () => {
    axios   //Axios to send and receive HTTP requests
      .get("http://localhost:8000/api/tasks/")
      .then(res => this.setState({ taskList: res.data }))
      .catch(err => console.log(err));
  };


  displayCompleted = status => {
    if (status) {
      return this.setState({ viewCompleted: true });
    }
    return this.setState({ viewCompleted: false });
  };


  renderTabList = () => {
    return (
      <div className="my-4 tab-list">
        <h4>List of tasks</h4>
        <span
          onClick={() => this.displayCompleted(true)}
          className={this.state.viewCompleted ? "active" : ""}
        >
          Completed
            </span>
        <span
          onClick={() => this.displayCompleted(false)}
          className={this.state.viewCompleted ? "" : "active"}
        >
          Incompleted
            </span>
      </div>
    );
  };

  // for rendering 
  renderItems = () => {
    const { viewCompleted } = this.state;
    const newItems = this.state.taskList.filter(
      item => item.completed === viewCompleted
    );
    return newItems.map(item => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`todo-title mr-2 ${this.state.viewCompleted ? "completed-todo" : ""
            }`}
          title={item.description}
        >
          {item.title}
        </span>
        <span>
          <button
            onClick={() => this.editItem(item)}
            className="btn btn-info mr-2"
          >
            Edit
          </button>
          <button
            onClick={() => this.handleDelete(item)}
            className="btn btn-danger mr-2"
          >
            Delete
          </button>
        </span>
      </li>
    ));
  };
  
  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };
 

   // for  Submitting an item
  handleSubmit = item => {
    this.toggle();
    if (item.id) {
      // for editing old task
      axios
        .put(`http://localhost:8000/api/tasks/${item.id}/`, item)
        .then(res => this.refreshList());
      return;
    }
    // for saving the edited task
    axios
      .post("http://localhost:8000/api/tasks/", item)
      .then(res => this.refreshList());
  };

  // Delete task
  handleDelete = item => {
    axios
      .delete(`http://localhost:8000/api/tasks/${item.id}/`)
      .then(res => this.refreshList());
  };

  // Create item
  createItem = () => {
    const item = { title: "", description: "", completed: false };
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  // for edit item
  editItem = item => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };


  render() {
    return (
      <main className="content context p-3 mb-2 bg-info">
        <h1 className="text-white-uppercase text-center my-4">Task Manager</h1>
        <div className="row ">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="text-left">
              <h4>Create Your tasks here </h4>
                <button onClick={this.createItem} className="btn btn-warning">
                  Add task
                  </button>
              </div>
              {this.renderTabList()}
              <ul className="list-group list-group-flush">
              {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
<footer className='my-3 mb-2 bg-info text-white text-center'>Copyright 2023&copy;All Rights Reserved</footer>
        {this.state.modal ? (
          <Modal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </main>
    );
  }
}
export default App;