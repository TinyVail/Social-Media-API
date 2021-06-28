const mongoose = require('mongoose');
const user = require("../models/User");
const thought = require('../models/Thought');

const userModel = mongoose.model(user.name, user.schema);
const thoughtModel = mongoose.model(thought.name, thought.schema);

module.exports = {
    user: userModel,
    thought: thoughtModel,
}
