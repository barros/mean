const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const config = require('./config/database')

// Connect to database
mongoose.connect(config.database);
// On connection
mongoose.connection.on('connected', () => {
  console.log('Connected to db: '+config.database)
})

mongoose.connection.on('error', (err) => {
  console.log('*** MongoDB error: '+err)
})

const app = express();
// Port number
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.use(express.static(path.join(__dirname, 'public'))); 

// Routes
const users = require('./routes/users');
app.use('/users', users);

// Start server
app.listen(port, () => {
  console.log(`Server started on port ${port}`)
});

app.get('/', (req, res) => {
  res.send('Invalid endpoint')
});