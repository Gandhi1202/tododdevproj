import React, { useState, useEffect } from 'react';
import './AddTask.css';
import { FaBook, FaPen, FaTrash } from 'react-icons/fa';
import {format} from "date-fns"
const AddTask = () => {
  const [taska, setTask] = useState(''); // State for new task input
  const [tasks, setTasks] = useState([]); // State to store tasks
  const [editingId, setEditingId] = useState(null); // ID of the task currently being edited
  const [editingText, setEditingText] = useState(''); // Text for the task being edited
  const [assignDate, setAssignDate] = useState('');
  const [editingDate, setEditingDate] = useState('');
  
  // Effect to load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('ppp')) || [];
    setTasks(savedTasks); // Initialize tasks from localStorage if available
  }, []);

  // Function to add a new task
  const addTaskSubmit = (e) => {
    e.preventDefault();
    if (taska === '') return; // Prevent adding empty tasks

    const payLoad = {
      taska,
      id: Date.now(),
      date: assignDate,
    };

    // Update state and localStorage directly
    const updatedTasks = [...tasks, payLoad];
    setTasks(updatedTasks); // Update state
    localStorage.setItem('ppp', JSON.stringify(updatedTasks)); // Update localStorage
    setTask(''); // Clear the input field
    setAssignDate(''); // Clear the date input
    console.log(payLoad);
  };

  // Function to delete a task
  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem('ppp', JSON.stringify(updatedTasks));
    console.log(`Task with ID: ${id} deleted`);
  };

  // Function to start editing a task
  const startEditing = (id, currentText, currentDate) => {
    setEditingId(id); // Set the task ID that is being edited
    setEditingText(currentText); // Set the current text to be edited
    setEditingDate(currentDate); // Set the current date to be edited
  };

  // Function to save edited task
  const saveEditedTask = (e) => {
    e.preventDefault();

    const updatedTasks = tasks.map((task) =>
      task.id === editingId ? { ...task, taska: editingText, date: editingDate } : task
    );

    setTasks(updatedTasks); // Update state
    localStorage.setItem('ppp', JSON.stringify(updatedTasks)); // Update localStorage

    setEditingId(null); // Clear editing state
    setEditingText(''); // Clear the editing text
    setEditingDate(''); // Clear the editing date
    console.log(`Task with ID: ${editingId} edited`);
  };

  return (
    <div className="zing">
      <div className="main-div-task">
        <div className="todoinput">
          <p>Todo Input</p>
        </div>
        <form onSubmit={addTaskSubmit}>
          <div className="border-1">
            <div className="inp-book">
              <div className="book-icon"><FaBook /></div>
              <input
                type="text"
                className="ttt"
                placeholder="Add Task"
                value={taska}
                onChange={(e) => setTask(e.target.value)}
              />
              <input
                type="date"
                className="ttt"
                value={assignDate}
                onChange={(e) => setAssignDate(e.target.value)}
              />
            </div>
            <div className="button-add">
              <button>Add new task</button>
            </div>
          </div>
        </form>

        <div className="save-task">
          {tasks.length > 0 ? (
            tasks.map((t) => (
              <div key={t.id} className="task-row">
                {editingId === t.id ? (
                  // Editing Mode - Show task inputs and save button in place
                  <form onSubmit={saveEditedTask} className="edit-form">
                    <input
                      type="text"
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      autoFocus
                    />
                    
                  </form>
                ) : (
                  // View Mode
                  <div className="task-name">{t.taska}</div>
              
                )}
                {/*  */}
                {editingId === t.id ? (
                  // Editing Mode - Show task inputs and save button in place
                  <form onSubmit={saveEditedTask} className="edit-form">
                <input
                      type="date"
                      value={editingDate}
                      onChange={(e) => setEditingDate(e.target.value)}
                    />
                    <button type="submit">Save</button>
             
                </form>
                ) : (
                  <div className="task-name">{format(t.date,"dd-MM-yyyy")}</div>
                )}
                <div className="edit-icon" onClick={() => startEditing(t.id, t.taska, t.date)}>
                  <FaPen />
                </div>
                <div className="delete-icon" onClick={() => deleteTask(t.id)}>
                  <FaTrash />
                </div>
              </div>
            ))
          ) : (
            <h4>No Data Available</h4>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddTask;
