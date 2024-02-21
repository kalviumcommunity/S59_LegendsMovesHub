const express = require('express');
const app = express();
const port = 1111;

app.get('/', (req,res)=>{
    res.send('Hello, this is local host!')
});

app.listen(port,()=>{
    console.log('Server is running ')
});