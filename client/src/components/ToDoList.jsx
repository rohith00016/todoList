import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contextApi/AuthContext';

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [error, setError] = useState(null);

  const { userId, authToken } = useAuth();

  useEffect(() => {
    fetchTasks();
  }, [userId, authToken]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/tasks/${userId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setTasks(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setError('Error fetching tasks. Please try again.');
    }
  };

  const addTask = async () => {
    if (newTask.trim() !== '') {
      try {
        await axios.post(
          `http://localhost:3000/api/tasks/${userId}/add`,
          { text: newTask, userId },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        setNewTask('');
        fetchTasks();
      } catch (error) {
        console.error('Error adding task:', error);
        setError('Error adding task. Please try again.');
      }
    }
  };

  const removeTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:3000/api/tasks/${userId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        data: { taskId },
      });

      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error('Error removing task:', error);
      setError('Error removing task. Please try again.');
    }
  };

  return (
    <div className="container-sm mt-4">
      {error && <p className="text-danger">{error}</p>}

      {!error && (
        <>
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
        </>
      )}
    </div>
  );
};

export default ToDoList;
