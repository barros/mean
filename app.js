const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

const app = express();
const users = require('./routes/users');

app.use(cors());
app.use(bodyParser.json());

app.use('/users', users);
app.use(express.static(path.join(__dirname, 'public'))); 

const port = 3000;

// start server
app.listen(port, () => {
  console.log(`Server started on port ${port}`)
});

app.get('/', (req, res) => {
  res.send('Invalid endpoint')
});