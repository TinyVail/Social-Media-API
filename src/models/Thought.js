const { Module } = require('module');
const mongoose = require('mongoose');

const thoughtSchema = new mongoose.Schema({
    thoughtText: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minLength: 1,
        maxLength: 280
    },
    createdAt: {
        type: Date,
        trim: true,
        unique: true,
    },
    username: {},
    reactions: {},
});

module.exports = thoughtSchema;