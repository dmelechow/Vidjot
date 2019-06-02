const express = require('express');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const passport = require('passport');
const router = express.Router();


// Load user model
require('../models/User');
const UserModel = mongoose.model('users');

// User Login Route
router.get('/login', (req, res) => {
    res.render('users/login');
});

// User register Route
router.get('/register', (req, res) => {
    res.render('users/register');
});

router.get('/alluser', (req, res) => {

    UserModel.find({})
        .then(users => {
            console.log(users);
        });

    res.send('all users');
});

function registerErrors(req, res, errors) {
    res.render('users/register', {
        errors: errors,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        password2: req.body.password2
    });
}

// Register form
router.post('/register', (req, res) => {

    let errors = [];
    if (req.body.password != req.body.password2) {
        errors.push({ title: 'Passwords do not match' });
    }

    if (req.body.password.length < 4) {
        errors.push({ title: 'Password must be at least 4 characters' })
    }

    if (errors.length > 0) {
        registerErrors(req, res, errors);
    } else {

        UserModel.findOne({ email: req.body.email })
            .then(user => {
                if (user) {
                    errors.push({title: 'Email is already registered'});
                    registerErrors(req, res, errors);
                } else {
                    const newUser = new UserModel({
                        name: req.body.name,
                        email: req.body.email,
                        password: req.body.password
                    });

                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            newUser.password = hash;
                            newUser.save()
                                .then(user => {
                                    res.redirect('/users/login');
                                })
                                .catch(err => {
                                    console.log(err);
                                    return;
                                });
                        });
                    });
                }
            });

    }
});


module.exports = router