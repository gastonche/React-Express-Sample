const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    _id: { type: mongoose.Schema.ObjectId, auto: true},
    emailAddress: String,
    password: String
}, {collection: 'User'});

module.exports = mongoose.model('User', schema);