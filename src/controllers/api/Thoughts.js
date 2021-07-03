const router = require('express').Router();
const mongoose = require('mongoose');
const models = require('../../models/Models');


// find all thought

router.get('/', async (req, res) => {
    const thoughts = await models.thought.find();
    // Return thought data as JSON
    if (thoughts != null) {
        res.status(200).send(thoughts);
    } else {
        res.status(400).send(`Thoughts do not exist, therefore no thoughts`);
    }
});

// find one by id
router.get('/:id', async (req, res) => {
    try {
        const thought = await models.thought.findById(req.params.id);
        if (thought != null) {
            res.status(200).send(thought);
        } else {
            res.status(400).send(`Thought entered do not exist, so no thoughts`);
        }
    } catch (error) {
        res.status(400).send(`Thought entered do not exist, so no thoughts`);
    }
});

// create a thought
router.post('/', async (req, res) => {
    const thoughtText = req.body.thoughtText;
    const userId = req.body.userId;
    const username = req.body.username;

    if (thoughtText != null && userId != null && username != null) {
        try {
            const newThought = new models.thought({
                thoughtText: thoughtText,
                username: username,
            });
            await newThought.save();
            // update associated user
            const id = newThought._id;
            const user = await models.user.findById(userId);
            user.thoughts.push(id);
            await user.save();
            res.status(200).send(newThought);
        } catch (e) {
            res.status(400).send(e);
        }
    } else {
        res.status(400).send("Please fill out proper info to create a a thought");
    }
});

//delete a thought

router.delete('/:id', async (req, res) => {
    try {
        // update thoughts in thought model
        const thought = await models.thought.findByIdAndDelete(req.params.id);
        // updated thoughts in user model 
        const affectedUser = await models.user.findOne({ username: thought.username });
        affectedUser.thoughts = affectedUser.thoughts.filter(userThought => userThought != req.params.id);
        await affectedUser.save();
        if (thought != null) {
            res.status(200).send({
                thought: thought,
                user: affectedUser
            });
        } else {
            res.status(400).send(`Thought entered do not exist, so no thoughts`);
        }
    } catch (error) {
        res.status(400).send(`Thought entered do not exist, so no thoughts`);
    }
});

// reaction 

router.post('/api/thoughts:thoughtId/reactions', async (req, res) => {
    try {
        // Step 1: find the user associated with userId
        const user = await models.thought.findById(req.params.userId);
        // Step 2: find the user associated with friendId (to make sure they exist)
        const reactionThought = await models.thought.findById(req.params.thoughtId);
        // Step 3: Update the userId User's friends array to also have the friendId
        user.thought.push(reactionThought._id);
        await user.save();
        res.status(200).send(user);
    } catch (e) {
        res.status(400).send(`Error: ${e}`);
    }
});


module.exports = router;
