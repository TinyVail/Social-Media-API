/**
    This file contains the code for the User model in the MONGODB database
*/

const mongoose = require('mongoose');
const thought = require('./Thought');
const name = "User";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate: {
            validator: (inputToValidate) => {
                return /(?:[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(inputToValidate);
            },
            message: props => `${props.value} is not a valid email address!`
        },

    },
    thoughts: [{ type: mongoose.Schema.Types.ObjectId, ref: thought.name }],
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: name }]
});



module.exports = {
    schema: userSchema,
    name: name,
};

// const userImport = require('../models/User');
// If we want the schema: userImport.schema;
// If we want the name: userImport.name;