const express = require('express');
const router = express.Router();
const handlers = require('./handlers'); 

router.post('/create', handlers.createItem);

router.get('/read', handlers.readItems);

router.put('/update/:id', handlers.updateItem);

router.delete('/delete/:id', handlers.deleteItem);

module.exports = router;
