const express       = require('express');
const app           = express();
const bodyparser    = require('body-parser');
const PORT            = process.env.PORT || 8080;

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

shipRoutes = require('./routes/ship-routes');

app.use('/api', shipRoutes);

var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/starships');

app.listen(PORT);

console.log('Connected to the United Federation of Planets Starship Registry at: ' + PORT);
