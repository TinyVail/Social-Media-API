const router = require('express').Router();
const mongoose = require('mongoose');
const models = require('../../models/Models');

// find all users

router.get('/', async (req, res) => {
    const users = await models.user.find();
    // Return user data as JSON
    if (users != null) {
        res.status(200).send(users);
    } else {
        res.status(400).send(`Users do not exist`);
    }
});

// find one by id

// router.get('/:id', async (req, res) => {
//     const id = req.params.id;
//     // Find user by primary key ID
//     const user = await userSchema.findOne({
//         where: { id: id },
//         include: [{
//             schema: userSchema,
//             name: name,
//         }]
//     });
//     if (user != null) {
//         res.status(200).send(user);
//     } else {
//         res.status(400).send(`User ID ${id} does not exist`);
//     }
// });

module.exports = router;
