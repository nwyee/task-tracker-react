import Header from "./components/Header";
import Footer from "./components/Footer";
import Tasks from "./components/Tasks";
import React, { useState, useEffect } from "react";
import AddTask from "./components/AddTask";
import { BrowserRouter as Router, Route } from "react-router-dom";
import About from "./components/About";

function App() {
  const name = "Nan";

  const [showAddTask, setShowAddTask] = useState(false);

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };
    getTasks();
  }, []);

  // fetch tasks from backend
  const fetchTasks = async () => {
    const response = await fetch("http://localhost:5000/tasks");
    const data = await response.json();
    return data;
  };

  // fetch single task from backend
  const fetchTask = async (id) => {
    const response = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await response.json();
    return data;
  };

  //add task
  const addTask = async (task) => {
    const id = tasks.length + 1;
    const newTask = { id, ...task };
    const res = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newTask),
    });
    const data = await res.json();
    console.log(data);
    setTasks([...tasks, data]);
  };
  //delete task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE",
    });
    setTasks(tasks.filter((task) => task.id !== id));
  };
  //toggle remider
  const toggleReminder = async (id) => {
    const task = await fetchTask(id);
    const update = { ...task, reminder: !task.reminder };
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(update),
    });

    const data = await res.json();

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: !task.reminder } : task
      )
    );
  };
  return (
    <Router>
    <div className="container">
      <Header 
        title="Task Tracker App"
        onAdd={() => setShowAddTask(!showAddTask)}
        showAdd={showAddTask}
      />
     
      <Route path="/" exact render={ (props) => (
        <>  
        { showAddTask && <AddTask onAdd={addTask} />}
          <h2>Hi {name} !!</h2>
          {tasks.length > 0 ? (
              <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
          ) : 
          (
        "No task to show")
        }
      </>
      )} />

      <Route path="/about" component={About} />
      <Footer />
    </div>
    </Router>
  );
}

export default App;
