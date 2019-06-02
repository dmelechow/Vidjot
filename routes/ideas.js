const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

//Get data from DB
require('../models/Idea');
const Idea = mongoose.model('ideas');

// Idea inedx Page
router.get('/', (req, res) => {
    Idea.find({})
        .sort({ date: 'desc' })
        .then(ideas => {
            res.render('ideas/index', {
                ideas: ideas
            });
        });
});

// Index Route
router.get('/add', (req, res) => {
    res.render('ideas/add');
});

// Edit Idea form
router.get('/edit/:id', (req, res) => {

    console.log("req.param.id " + req.param.id);

    Idea.findOne({
        _id: req.param.id
    })
        .then(idea => {
            // console.log("idea title" + idea.title);
            // console.log("idea detai;s" + idea.details);

            res.render('ideas/edit', {
                idea: idea
            })
        })
});

router.get('/about', (req, res) => {
    const huy = "HUYna"
    res.render('about', {
        huy: huy
    });
})


// Process Form
router.post('/ideas', (req, res) => {
    let errors = [];

    if (!req.body.title) {
        errors.push({ text: 'Please add the title' });
    }

    if (!req.body.details) {
        errors.push({ text: 'Please add the details' });
    }

    if (errors.length > 0) {
        res.render('ideas/add', {
            errors: errors,
            title: req.body.title,
            details: req.body.details
        });
    } else {
        const newUser = {
            title: req.body.title,
            details: req.body.details
        }

        new Idea(newUser)
            .save()
            .then(idea => {
                res.redirect('/ideas');
            })
            .catch(err => {
                console.log(err);
                return;
            });
    }
});


// Edit From process
router.put('/ideas/:id', (req, res) => {
    res.send('Put');
})


module.exports = router