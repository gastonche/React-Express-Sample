var express = require('express');
var router = express.Router();
var User = require('../db/models/User');
var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {accessTokenSecret} = require('../configs');

/* GET home page. */
router.post('/login', function(req, res, next) {
    const { email: emailAddress, password } = req.body;

    User.findOne({emailAddress}, (err, user) => {
        if(err) {
            next(err);
        }else if(user) {
            bcrypt.compare(password, user.password, (err, passed) => {
                if(err) next(err);
                if(passed) {
                    return sendToken(user, res);
                }else{
                    const error = new Error('invalid credentials');
                    error.status = 401;
                    return next(error);
                }
            });
        }else{
            const error = new Error('invalid credentials');
            error.status = 401;
            return next(error);
        }
    });
});

router.post('/register', function(req, res, next) {
    const { email: emailAddress, password } = req.body;
    User.findOne({emailAddress}).then((err, user) => {
        if(err) {
            next(err);
        }else if(user) {
            const error = new Error('email address already taken');
            error.status = 401;
            return next(error);
        }else{
            const hashedPassword = bcrypt.hashSync(password, 10);
            const user = new User({emailAddress, password: hashedPassword});
            user.save((err, user) => {
                if(err) { return next(err);}
                return sendToken(user, res);
            });
        }
    });
});

function sendToken(user, res) {
    const accessToken = jwt.sign({ emailAddress: user.emailAddress}, accessTokenSecret);
    return res.json({
        accessToken
    }).status(200);
}

module.exports = router;
