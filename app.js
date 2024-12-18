const express = require('express');

const app = express();

const path = require('path');

const PORT = 3000;

const route = require('./routes/router');

let players = [];
let currentQuestionIndex = 0;
let scores = {};

// Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));
app.use(route);


app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
