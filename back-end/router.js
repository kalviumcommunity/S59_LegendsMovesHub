const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const handlers = require('./handlers');
const Joi = require('joi');

const mainSchema = new mongoose.Schema({
  type: { type: String },
  title: { type: String },
  description: { type: String },
  image: { type: String }
});

const celebrationSchema = Joi.object({
  category: Joi.string().required(),
  type: Joi.string().required(),
  title: Joi.string().required(),
  description: Joi.string().required(),
  image: Joi.string().required(),
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
});

const User = mongoose.model('users', userSchema);



const celebrations = mongoose.model('celebfootball', mainSchema);
const celebcrickets = mongoose.model('celebcrickets', mainSchema);

router.get('/data/football', async (req, res) => {
  let data = await celebrations.find();
  res.send(data);
});

router.get('/data/cricket', async (req, res) => {
  let data = await celebcrickets.find();
  res.send(data);
});

router.post('/create/cricket', async (req, res) => {
  try {
    const type = req.body.category;

    const { error } = celebrationSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errorMessages = error.details.map(detail => detail.message);
      return res.status(400).json({ success: false, message: 'Invalid data', errors: errorMessages });
    }

    if (type === 'cricket') {
      const newItem = new celebcrickets(req.body);
      let saved = await newItem.save();
      console.log(saved);
      res.status(201).json({ success: true, message: 'Item created successfully', obj: saved });
    } else if (type === 'football') {
      return res.status(400).json({ success: false, message: 'Invalid type' });
    } else {
      return res.status(400).json({ success: false, message: 'Invalid type' });
    }
  } catch (error) {
    console.error('Error creating item:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error', error: error });
  }
});

router.post('/create/football', async (req, res) => {
  try {
    const type = req.body.category;

    const { error } = celebrationSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errorMessages = error.details.map(detail => detail.message);
      return res.status(400).json({ success: false, message: 'Invalid data', errors: errorMessages });
    }

    const newItem = new celebrations(req.body);
    let saved = await newItem.save();

    console.log(saved);
    res.status(201).json({ success: true, message: 'Item created successfully', obj: saved });
  } catch (error) {
    console.error('Error creating item:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error', error: error });
  }
});

  router.delete('/data/football/delete/:id', async (req, res) => {
    try {
        const itemId = req.params.id;
        await celebrations.findByIdAndDelete(itemId);
        res.json({ success: true, message: 'Item deleted successfully' });
    } catch (error) {
        console.error('Error deleting item:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error', error: error });
    }
});

router.delete('/data/cricket/delete/:id', async (req, res) => {
  try {
      const itemId = req.params.id;
      await celebcrickets.findByIdAndDelete(itemId);
      res.json({ success: true, message: 'Item deleted successfully' });
  } catch (error) {
      console.error('Error deleting item:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error', error: error });
  }
});

router.put('/data/football/update/:id', async (req, res) => {
  try {
    const itemId = req.params.id;
    const updatedData = req.body;
    const result = await celebrations.findByIdAndUpdate(itemId, updatedData, { new: true });
    res.json({ success: true, message: 'Item updated successfully', updatedItem: result });
  } catch (error) {
    console.error('Error updating item:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error', error: error });
  }
});

router.put('/data/cricket/update/:id', async (req, res) => {
  try {
    const itemId = req.params.id;
    const updatedData = req.body;
    const result = await celebcrickets.findByIdAndUpdate(itemId, updatedData, { new: true });
    res.json({ success: true, message: 'Item updated successfully', updatedItem: result });
  } catch (error) {
    console.error('Error updating item:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error', error: error });
  }
});

router.post('/signup', async (req, res) => {
  try {
    const { username, password, email } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Username already exists' });
    }

    // Create a new user
    const newUser = new User({ username, password, email });
    await newUser.save();

    res.status(201).json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error', error });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ username, password });

    if (user) {
      // User found, consider adding additional validation like password comparison

      res.status(200).json({ success: true, message: 'Login successful' });
    } else {
      // User not found or password is incorrect
      res.status(401).json({ success: false, message: 'Invalid username or password' });
    }
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});






router.get('/read', handlers.readItems);

module.exports = router;
