const express = require('express');
const mongoose = require("mongoose")
const router = express.Router();
const handlers = require('./handlers'); 

const footballSchema = new mongoose.Schema({
    type: { type: String },
    title: { type: String },
    description: { type: String },
    image: { type: String }
});


const celebrations = mongoose.model('celebfootballs', footballSchema);


router.post('/create', handlers.createItem);

router.get('/read', handlers.readItems);

router.get('/data', async(req,res)=>{
    let data = await celebrations.find()
    res.send(data)
})

router.put('/update/:id', handlers.updateItem);

router.delete('/delete/:id', handlers.deleteItem);

module.exports = router;
