const mongoose = require('mongoose');
const userSchema = require("../models/User");
const thoughtSchema = require('../models/Thought');

const databaseName = "SocialMediaAPI";
async function connect() {
    try {
        // Connect to the database
        await mongoose.connect(`mongodb://localhost:27017/${databaseName}`, { useNewUrlParser: true });
        // Create a model
        const userModel = mongoose.model("User", userSchema);
        // Create an instance of the model
        const user = new userModel({
            username: "TestUser2",
            email: "test2@mail.net",
            thoughts: [],
            friends: []
        });
		// Save the user to the database and log the result
        const saveResult = await user.save();
        console.log("Creating User Status:");
        console.log(saveResult);
    } catch (e) {
        console.error(e);
    }
}

connect();

