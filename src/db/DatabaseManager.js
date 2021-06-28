const mongoose = require('mongoose');

const databaseName = "SocialMediaAPI";

async function connect() {
    return await mongoose.connect(`mongodb://localhost:27017/${databaseName}`, { useNewUrlParser: true });
}

module.exports = connect;
