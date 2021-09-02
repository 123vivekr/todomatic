import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState({})

  useEffect(() => {
    let savedTasks = window.localStorage.getItem("tasks");
    console.log(savedTasks);
    if(savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    console.log(JSON.stringify(tasks));
    window.localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const addTask = (event) => {
    event.preventDefault();
    if(title === "" || description === "") {
      return;
    }

    let taskList = Object.assign({}, tasks);
    let newTask = {
      title: title,
      description: description
    };

    taskList[Math.random().toString(36).substr(2, 9)] = newTask;
    setTasks(taskList);

    setTitle("");
    setDescription("");
  }

  const deleteTask = (taskId) => {
   let taskList = Object.assign({}, tasks);
   delete taskList[taskId];
   setTasks(taskList);
  }

  return (
    <div className="main-container">
      <h1>TODO</h1>

      <form className="task-form" onSubmit={addTask}>
        <h2>Add Task</h2>

        <label>Title</label>
        <input type="text" placeholder="Enter title..." value={title} onChange={(event) => { setTitle(event.target.value) }} />

        <label>Description</label>
        <input type="text" placeholder="Enter description..." value={description} onChange={(event) => { setDescription(event.target.value) }} />

        <input type="submit" value="Add task" />
      </form>

      <div className="notes-container">
        {
          Object.keys(tasks).length > 0? (
            Object.entries(tasks).map(([id, task]) => {
              return <Todo key={id} id={id} title={task.title} desc={task.description} onDeleteClick={deleteTask} />
            })
          ):(
            <h3>
              All done! :D
            </h3>
          )
        }
      </div>

    </div>
  );
}

function Todo({ id, title, desc, onDeleteClick }) {
  return (
    <div className="note-container">
      <div className="note-title">
        {title}
        <div>
          <button className="delete-button" onClick={() => onDeleteClick(id)}>
            Delete
          </button>
        </div>
      </div>
      <div className="note-desc">
        {desc}
      </div>
    </div>
  );
}

export default App;
