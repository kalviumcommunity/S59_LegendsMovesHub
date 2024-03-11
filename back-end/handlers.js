const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  type: { type: String },
    title: { type: String },
    description: { type: String },
    image: { type: String }
});

// const Item = mongoose.model('Item', itemSchema);

// Create Handler
const createItem = async (req, res) => {
  try {
    const newItem = await new Item(req.body);
    await newItem.save();
    res.status(201).json({ success: true, message: 'Item created successfully' });
  } catch (error) {
    console.error('Error creating item:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Read Handler
const readItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.json({ success: true, items });
  } catch (error) {
    console.error('Error reading items:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Update Handler
const updateItem = async (req, res) => {
  const itemId = req.params.id;
  const updatedItem = req.body;

  try {
    const item = await Item.findByIdAndUpdate(itemId, updatedItem, { new: true });

    if (item) {
      res.json({ success: true, message: 'Item updated successfully' });
    } else {
      res.status(404).json({ success: false, message: 'Item not found' });
    }
  } catch (error) {
    console.error('Error updating item:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Delete Handler
const deleteItem = async (req, res) => {
  const itemId = req.params.id;

  try {
    const item = await Item.findByIdAndDelete(itemId);

    if (item) {
      res.json({ success: true, message: 'Item deleted successfully' });
    } else {
      res.status(404).json({ success: false, message: 'Item not found' });
    }
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

module.exports = {
  createItem,
  readItems,
  updateItem,
  deleteItem,
};
