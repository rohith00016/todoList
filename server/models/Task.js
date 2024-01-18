const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  tasks: [
    {
      text: {
        type: String,
        required: true,
      },
    },
  ],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
