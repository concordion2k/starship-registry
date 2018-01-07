const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StarshipSchema = new Schema({
    class: String,
    registry: String,
    name: String,
    service_start: Date,
    officers: Array
});

module.exports = mongoose.model('Starship', StarshipSchema);
