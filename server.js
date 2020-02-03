// importing packages
const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const logger = require('morgan');

// declaring which database to use based on environment
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/techCrunchArticlesDB';

// initializing express
const app = express();
const PORT = process.env.PORT || 3000;

// requiring routes file
const routes = require('./routes');
app.use(routes);

// using morgan to log requests
app.use(logger('dev'));

// parsing request body as JSON object
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// making static folders public
app.use(express.static('public'));


// connecting to MongoDB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// setting up template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// starting the server
app.listen(PORT, function () {
    console.log(`Listening on port ${PORT}`);
});