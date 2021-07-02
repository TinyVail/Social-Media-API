const router = require('express').Router();
const mongoose = require('mongoose');
const models = require('../../models/Models');


// find all thoughts
router.get('/', async (req, res) => {
    const thoughts = await models.thought.find();
    // Return user data as JSON
    if (thoughts != null) {
        res.status(200).send(thoughts);
    } else {
        res.status(400).send(`No thoughts here!`);
    }
});

// find one by id
router.get('/', async (req, res) => {
    const thought = await models.thought.findOne();
    // Return user data as JSON
    if (thought != null) {
        res.status(200).send(thought);
    } else {
        res.status(400).send(`There are no thoughts here`);
    }
});

module.exports = router;
