// Task1: initiate app and run server at 3000

const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend static files
app.use(express.static(path.join(__dirname, 'dist', 'Frontend')));
app.use(express.static(path.join(__dirname, 'dist', 'FrontEnd')));

// Task2: create mongoDB connection 
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://mevin224789_db_user:KrTNnpz2IuPY5j8a@cluster0.3g5d57p.mongodb.net/EmployeeDB?retryWrites=true&w=majority';

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas successfully');
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
  });

// Employee Schema and Model
const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  position: { type: String, required: true },
  salary: { type: Number, required: true }
});

const Employee = mongoose.model('Employee', employeeSchema);

// Task 2 : write api with error handling and appropriate api mentioned in the TODO below

// TODO: get data from db using api '/api/employeelist'
app.get('/api/employeelist', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ error: 'Error retrieving employee list', message: err.message });
  }
});

// TODO: get single data from db using api '/api/employeelist/:id'
app.get('/api/employeelist/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.status(200).json(employee);
  } catch (err) {
    res.status(500).json({ error: 'Error retrieving employee', message: err.message });
  }
});

// TODO: send data from db using api '/api/employeelist'
// Request body format: {name:'',location:'',position:'',salary:''}
app.post('/api/employeelist', async (req, res) => {
  try {
    const { name, location, position, salary } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }
    const newEmployee = new Employee({
      name,
      location,
      position,
      salary
    });
    const savedEmployee = await newEmployee.save();
    res.status(201).json(savedEmployee);
  } catch (err) {
    res.status(400).json({ error: 'Error adding employee', message: err.message });
  }
});

// TODO: delete a employee data from db by using api '/api/employeelist/:id'
app.delete('/api/employeelist/:id', async (req, res) => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
    if (!deletedEmployee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.status(200).json({ message: 'Employee deleted successfully', employee: deletedEmployee });
  } catch (err) {
    res.status(400).json({ error: 'Error deleting employee', message: err.message });
  }
});

// TODO: Update a employee data from db by using api '/api/employeelist'
// Request body format: {name:'',location:'',position:'',salary:''}
// Handles frontend PUT /api/employeelist with employee object in body (containing _id or name)
app.put('/api/employeelist', async (req, res) => {
  try {
    const id = req.body._id || req.body.id;
    let updatedEmployee;
    if (id) {
      updatedEmployee = await Employee.findByIdAndUpdate(id, req.body, { new: true });
    } else if (req.body.name) {
      updatedEmployee = await Employee.findOneAndUpdate({ name: req.body.name }, req.body, { new: true });
    } else {
      return res.status(400).json({ error: 'Employee id or name is required for update' });
    }

    if (!updatedEmployee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.status(200).json(updatedEmployee);
  } catch (err) {
    res.status(400).json({ error: 'Error updating employee', message: err.message });
  }
});

// Also support PUT /api/employeelist/:id for standard REST requests
app.put('/api/employeelist/:id', async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedEmployee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.status(200).json(updatedEmployee);
  } catch (err) {
    res.status(400).json({ error: 'Error updating employee', message: err.message });
  }
});

//! dont delete this code. it connects the front end file.
app.get(/.*/, function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});

// Start server on port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}`);
});

module.exports = app;
