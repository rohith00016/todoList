const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/User'); // Import the User model
const router = express.Router();

// Get all tasks for a specific user
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    res.json(user ? user.tasks : []);
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
    const user = await User.findById(userId);

    if (user) {
      user.tasks.push({ text });
      await user.save();
    } else {
      res.status(404).json({ error: 'User not found' });
      return;
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
    const user = await User.findById(userId);

    if (user) {
      const taskToUpdate = user.tasks.id(taskId);

      if (taskToUpdate) {
        taskToUpdate.text = text;
        await user.save();
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
// Change the route to accept the taskId in the request body
router.delete('/:userId', async (req, res) => {
  const { userId } = req.params;
  const { taskId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(taskId)) {
    return res.status(400).json({ error: 'Invalid ObjectId' });
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Use filter to exclude the taskToRemove
    user.tasks = user.tasks.filter(task => task._id.toString() !== taskId);

    // Save the user after removing the task
    await user.save();

    res.json({ message: 'Task removed successfully' });
  } catch (error) {
    console.error('Error removing task:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});





// Get a specific task for a specific user
router.get('/:userId/:taskId', async (req, res) => {
  const { userId, taskId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(taskId)) {
    return res.status(400).json({ error: 'Invalid ObjectId' });
  }

  try {
    const user = await User.findById(userId);

    if (user) {
      const task = user.tasks.id(taskId);

      if (task) {
        res.json(task);
      } else {
        res.status(404).json({ error: 'Task not found for the given user' });
      }
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching task:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
