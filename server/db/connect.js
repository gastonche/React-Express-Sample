var mongoose = require('mongoose');


module.exports = function() {
    mongoose.connect('mongodb://localhost/BetaRemitDB', {useNewUrlParser: true,  useUnifiedTopology: true});

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log('We\'re connected to db');
    });
}