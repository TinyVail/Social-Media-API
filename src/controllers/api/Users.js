const router = require('express').Router();
const mongoose = require('mongoose');
const models = require('../../models/Models');

// find all users

router.get('/', async (req, res) => {
    const user = await models.user.find();
    // Return user data as JSON
    if (user != null) {
        res.status(200).send(user);
    } else {
        res.status(400).send(`Users do not exist`);
    }
});

// find one by id
router.get('/:id', async (req, res) => {
    try {
        const user = await models.user.findById(req.params.id);
        if (user != null) {
            res.status(200).send(user);
        } else {
            res.status(400).send(`User entered do not exist`);
        }
    } catch (error) {
        res.status(400).send(`User entered do not exist`);
    }
});


// create new user 
// request body: 
/**
{
    username: string,
    email: string,
}

*/
router.post('/', async (req, res) => {
    const username = req.body.username;
    const email = req.body.email;

    if (username != null && email != null) {
        // can also be written as const newUser = new models.user({username,email})
        try {
            const newUser = new models.user({
                username: username,
                email: email
            });
            await newUser.save();
            res.status(200).send(newUser);
        } catch (e) {
            res.status(400).send(e);
        }
    } else {
        res.status(400).send("Please give a username and an email");
    }
});


// delete user


router.delete('/:id', async (req, res) => {
    try {
        const user = await models.user.findByIdAndDelete(req.params.id);
        if (user != null) {
            res.status(200).send(user);
        } else {
            res.status(400).send(`User entered do not exist`);
        }
    } catch (error) {
        res.status(400).send(`User entered do not exist`);
    }
});


// update user 

router.put('/:id', async (req, res) => {
    try {
        const body = req.body;
        if (!(body.username || body.email)) {
            res.status(400).send(`Must have email/username to update the user with`);
        }
        await models.user.findByIdAndUpdate(req.params.id, body);
        const user = await models.user.findById(req.params.id);
        if (user != null) {
            res.status(200).send(user);
        } else {
            res.status(400).send(`User entered do not exist`);
        }
    } catch (error) {
        res.status(400).send(`Error: ${error}`);
    }
});




// delete a users friend 

router.delete('/:id', async (req, res) => {
    try {
        const user = await models.user.findByIdAndDelete(req.params.id);
        if (user != null) {
            res.status(200).send(user);
        } else {
            res.status(400).send(`User entered do not exist`);
        }
    } catch (error) {
        res.status(400).send(`User entered do not exist`);
    }
});

// add a new friend to a user

router.post('/:userId/friends/:friendId', async (req, res) => {
    try {
        // Step 1: find the user associated with userId
        const user = await models.user.findById(req.params.userId);
        // Step 2: find the user associated with friendId (to make sure they exist)
        const friendUser = await models.user.findById(req.params.friendId);
        // Step 3: Update the userId User's friends array to also have the friendId
        user.friends.push(friendUser._id);
        await user.save();
        res.status(200).send(user);
    } catch (e) {
        res.status(400).send(`Error: ${e}`);
    }
});

module.exports = router;
