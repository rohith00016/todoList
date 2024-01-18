const express = require('express');
const mongoose = require('mongoose');
const Task = require('../models/Task'); // Import the Task model
const router = express.Router();

// Get all tasks for a specific user
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const userTasks = await Task.findOne({ userId });
    res.json(userTasks ? userTasks.tasks : []);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add a new task for a specific user
router.post('/:userId/add', async (req, res) => {
  const { text } = req.body;
  const { userId } = req.params;

  try {
    const userTasks = await Task.findOne({ userId });

    if (userTasks) {
      userTasks.tasks.push({ text });
      await userTasks.save();
    } else {
      const newTask = new Task({ tasks: [{ text }], userId });
      await newTask.save();
    }

    res.json({ message: 'Task added successfully' });
  } catch (error) {
    console.error('Error adding task:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a task for a specific user
router.put('/:userId/:taskId', async (req, res) => {
  const { text } = req.body;
  const { userId, taskId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(taskId)) {
    return res.status(400).json({ error: 'Invalid ObjectId' });
  }

  try {
    const userTasks = await Task.findOne({ userId });

    if (userTasks) {
      const taskToUpdate = userTasks.tasks.id(taskId);

      if (taskToUpdate) {
        taskToUpdate.text = text;
        await userTasks.save();
        res.json({ message: 'Task updated successfully!' });
      } else {
        res.status(404).json({ error: 'Task not found for the given user' });
      }
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Remove a task for a specific user
router.delete('/:userId/:taskId', async (req, res) => {
  const { userId, taskId } = req.params;
  console.log('UserId:', userId);
  console.log('TaskId:', taskId);

  if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(taskId)) {
    return res.status(400).json({ error: 'Invalid ObjectId' });
  }

  try {
    const result = await Task.updateOne(
      { userId },
      { $pull: { tasks: { _id: taskId } } }
    );

    if (result.nModified > 0) {
      res.json({ message: 'Task removed successfully' });
    } else {
      res.status(404).json({ error: 'Task not found for the given user' });
    }
  } catch (error) {
    console.error('Error removing task:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
