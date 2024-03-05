const express = require('express');
const mongoose = require("mongoose")
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


router.post('/create', handlers.createItem);

router.get('/read', handlers.readItems);

router.get('/data/football', async(req,res)=>{
    let data = await celebrations.find()
    res.send(data)
})

router.get('/data/cricket', async(req,res)=>{
    let data = await celebcrickets.find()
    res.send(data)
})

router.put('/update/:id', handlers.updateItem);

router.delete('/delete/:id', handlers.deleteItem);

module.exports = router;