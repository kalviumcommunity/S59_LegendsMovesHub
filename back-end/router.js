const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const handlers = require('./handlers');

const mainSchema = new mongoose.Schema({
  type: { type: String },
  title: { type: String },
  description: { type: String },
  image: { type: String }
});

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
      const newItem = new celebrations(req.body);
      let saved = await newItem.save();

      console.log(saved)
      res.status(201).json({ success: true, message: 'Item created successfully', obj : saved });
    } catch (error) {
      console.error('Error creating item:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error', error : error });
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







router.get('/read', handlers.readItems);

module.exports = router;
