import Header from "./Components/Header";
import Tasks from "./Components/Tasks";
import AddTask from "./Components/AddTask";
import { useState, useEffect } from "react";
import Footer from "./Components/Footer";
import About from "./Components/About";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TaskDetails from "./Components/TaskDetails";

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
  }, [])

  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data
  }
  const fetchTask = async (id) => {
    const res = await fetch(`ttp://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data
  }

  //delete task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',
    })
    setTasks(tasks.filter((task) => task.id !== id))
  }
  //reminder toggle
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

    const res = await fetch(`http://localhost:5000/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updatedTask)
    })

    const data = await res.json()

    setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: data.reminder } : task))
  }
  //add tasks
  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })

    const data = await res.json()

    setTasks([...tasks, data])
  }
  return (
    <Router>
      <div className="container">
        <Header onAdd={() => {
          setShowAddTask(!showAddTask)
        }} showAdd={showAddTask} />
        <Routes>
          <Route
            path='/'
            element={
            <>
              {showAddTask && <AddTask onAdd={addTask} />}
              {tasks.length > 0 ? <Tasks tasks={tasks}
                onDelete={deleteTask}
                onToggle={toggleReminder} /> :
                ('No tasks to show')}
            </>
            }
          />
          <Route path='/about' element={< About />}></Route>
          <Route path='/task/:id' element={< TaskDetails />}></Route>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
