const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./dbConnection/connection');
const userRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

const cors = require('cors');

const app = express();
const PORT = 3000;
app.use(cors({
  origin: 'http://localhost:5173',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

connectDB();

app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});