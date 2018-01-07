const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShipyardSchema = new Schema({
    num_docks: Number,
    location: String,
    registry: String,
    ships: Array
});

module.exports = mongoose.model('Shipyard', ShipyardSchema);
