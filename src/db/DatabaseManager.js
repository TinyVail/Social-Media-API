const mongoose = require('mongoose');
const user = require("../models/User");
const thought = require('../models/Thought');

const databaseName = "SocialMediaAPI";
async function connect() {
    try {
        // Connect to the database
        await mongoose.connect(`mongodb://localhost:27017/${databaseName}`, { useNewUrlParser: true });
        // Create a model
        const userModel = mongoose.model(user.name, user.schema);
        // Create an instance of the model
        const newUser = new userModel({
            username: "TestUser",
            email: "test2@mail.net",
            thoughts: [],
            friends: []
        });
        // Save the user to the database and log the result
        const saveResult = await newUser.save();
        console.log("Creating User Status:");
        console.log(saveResult);
    } catch (e) {
        console.error(e);
    }
}

connect();

