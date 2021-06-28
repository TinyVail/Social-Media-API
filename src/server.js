const express = require('express');
const connectToDatabase = require('./db/DatabaseManager')
const routes = require('./controllers/index');

async function run() {
    // wait for a database connection
    const _connection = await connectToDatabase();

    const app = express();
    const PORT = process.env.PORT || 3001;

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(routes);

    app.listen(PORT, () => {
        console.log(`App listening on port ${PORT}!`);
    });
}

run();