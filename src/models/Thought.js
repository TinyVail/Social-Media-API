const mongoose = require('mongoose');
const Reaction = require('./Reaction');
const user = require("./User");
const name = "Thought";

const thoughtSchema = new mongoose.Schema({
    thoughtText: {
        type: String,
        required: true,
        trim: true,
        unique: false,
        minLength: 1,
        maxLength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    username: {
        type: String,
        required: true
    },
    reactions: [Reaction.schema]
});

module.exports = {
    schema: thoughtSchema,
    name: name,
};