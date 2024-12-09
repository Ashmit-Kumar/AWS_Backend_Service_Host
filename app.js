const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());  // To parse JSON bodies

// Example route
app.get('/api/data', (req, res) => {
  res.json({ message: "Hello from the backend API" });
});

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/')
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const port =  5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
