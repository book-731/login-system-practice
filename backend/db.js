require('dotenv').config();// Load environment variables from the .env file
const {Pool} = require('pg'); // Import the Pool class from the pg library

const pool = new Pool({
    user: process.env.DB_USER, // Database username from environment variables
    host: process.env.DB_HOST, // Database host from environment variables
    database: process.env.DB_NAME, // Database name from environment variables
    password: process.env.DB_PASSWORD, // Database password from environment variables
    port: process.env.DB_PORT, // Database port from environment variables
});

pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Error executing query', err.message); // Log any errors that occur during the query
    }else {
        console.log('Database connected:', res.rows[0]); // Log the current time from the database if the connection is successful
    }
})

module.exports = pool; // Export the pool instance for use in other parts of the application