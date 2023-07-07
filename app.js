const express = require('express');
const router = require('./router.js');
const bodyParser = require('body-parser');
const headerCheckerMiddleware = require('./middleware');

const app = express();

app.use(bodyParser.json()); // To parse JSON data
app.use(headerCheckerMiddleware); // Use the middleware
app.use('/api/airtable', router); // Use the router


// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
