const express = require('express'); // Import the Express library
const cors = require('cors'); // Import the CORS middleware

const app = express(); // Create an instance of the Express application
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Enable parsing of JSON request bodies

app.get('/', (req, res) => {
    res.send('Hello, World!'); // Send a simple response for the root route
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000'); // Log a message when the server starts
});