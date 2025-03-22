const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB Compass
mongoose.connect(process.env.ATLAS_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log("MongoDB database connection established successfully"))
.catch(err => console.log("MongoDB connection error: ", err));

// Routes
const ticketsRouter = require('./routes/tickets');
const usersRouter = require('./routes/users');
const projectsRouter = require('./routes/projects');

app.use('/tickets', ticketsRouter);
app.use('/users', usersRouter);
app.use('/projects', projectsRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
app.get('/test', (req, res) => {
    res.json({ message: 'Connected to MongoDB!' });
});