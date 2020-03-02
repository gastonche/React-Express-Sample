const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    _id: { type: mongoose.Schema.ObjectId, auto: true},
    name: String, 
    type: String,
    price: Number,
    rating: Number,
    warranty_years: Number,
    available: Boolean,
}, {collection: 'Product'});

module.exports = mongoose.model('Product', schema);