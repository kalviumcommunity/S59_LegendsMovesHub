let items = [];
let itemIdCounter = 1;

const itemSchema = {
  id: Number,
  name: String,
  description: String,
  price: Number,
};

// Create Handler
const createItem = (req, res) => {
  const newItem = {
    id: itemIdCounter++,
    ...itemSchema, 
    ...req.body,
  };
  items.push(newItem);
  res.send({ success: true, message: 'Item created successfully' });
};

// Read Handler
const readItems = (req, res) => {
  res.send({ success: true, items });
};

// Update Handler
const updateItem = (req, res) => {
  const itemId = req.params.id;
  const updatedItem = req.body;

  const index = items.findIndex((item) => item.id === itemId);
  if (index !== -1) {
    items[index] = { ...items[index], ...updatedItem };
    res.json({ success: true, message: 'Item updated successfully' });
  } else {
    res.status(404).json({ success: false, message: 'Item not found' });
  }
};

// Delete Handler
const deleteItem = (req, res) => {
  const itemId = req.params.id;

  items = items.filter((item) => item.id !== itemId);

  res.json({ success: true, message: 'Item deleted successfully' });
};

module.exports = {
  createItem,
  readItems,
  updateItem,
  deleteItem,
};
