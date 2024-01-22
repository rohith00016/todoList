const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  tasks: [
    {
      text: {
        type: String,
        required: true,
      },
      // You can include additional fields for tasks as needed
      // For example, you might want to add a field for task completion status
      completed: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
