const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const router = require('./router'); 
dotenv.config();

const App = express();

const mongoDBUser = process.env.MONGODB_USER;
const mongoDBPassword = process.env.MONGODB_PASSWORD;
const mongoDBCluster = process.env.MONGODB_CLUSTER;
const mongoDBDatabase = process.env.MONGODB_DATABASE;

const mongoDBUri = `mongodb+srv://${mongoDBUser}:${mongoDBPassword}@${mongoDBCluster}.tcq0r47.mongodb.net/${mongoDBDatabase}?retryWrites=true&w=majority&appName=Cluster0`;

let isConnected = false;

mongoose.connect(mongoDBUri)
  .then(() => {
    isConnected = true;
    console.log("MongoDB CONNECTED ✅✅✅")

    mongoose.connection.on('error', (error) => {
      console.error('MongoDB Connection Error:', error);
    });

  })
  .catch((error) => {
    isConnected = true;
    console.error('Error connecting to MongoDB:', error);
  });

App.use('/api', router);

App.get('/jj', (req, res) => {
  const connectionStatus = isConnected ? 'Connected to MongoDB✅' : 'Not connected to MongoDB❌';
  res.send(`<h1>Kamakshi</h1><p>${connectionStatus}</p>`);
});

const PORT = process.env.PORT || 8080;
App.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
