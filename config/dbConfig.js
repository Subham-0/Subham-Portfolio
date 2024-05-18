const mongoose = require("mongoose");

// Check if the MongoDB URI is defined
if (!process.env.mongo_url) {
    console.error("MongoDB URI is not defined. Make sure to set the 'mongo_url' environment variable.");
    process.exit(1); // Exit the process if URI is not defined
}

mongoose.connect(process.env.mongo_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const connection = mongoose.connection;

connection.on("error", (error) => {
    console.error('Error connecting to database:', error);
});

connection.on("connected", () => {
    console.log('Database connection successful');
});

module.exports = connection;
