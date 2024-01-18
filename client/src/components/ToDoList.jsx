import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contextApi/AuthContext';

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const { userId } = useAuth();

  useEffect(() => {
    fetchTasks();
  }, [userId]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/tasks/${userId}`);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const addTask = async () => {
    if (newTask.trim() !== '') {
      try {
        await axios.post(`http://localhost:3000/tasks/${userId}/add`, { text: newTask, userId });
        setNewTask('');
        fetchTasks();
      } catch (error) {
        console.error('Error adding task:', error);
      }
    }
  };

  const removeTask = async (taskId) => {
    try {
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
      await axios.delete(`http://localhost:3000/tasks/${userId}/${taskId}`);
    } catch (error) {
      console.error('Error removing task:', error);
    }
  };

  return (
    <div className="container mt-4">
      <ul className="list-group">
        {tasks.map((task) => (
          <li key={task._id} className="list-group-item d-flex justify-content-between align-items-center">
            {task.text}
            <button className="btn btn-danger" onClick={() => removeTask(task._id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-3">
        <input
          type="text"
          placeholder="Add a new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="form-control"
        />
        <button className="btn btn-primary mt-2" onClick={addTask}>
          Add Task
        </button>
      </div>
    </div>
  );
};

export default ToDoList;
