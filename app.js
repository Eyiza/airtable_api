const express = require('express');
const router = require('./router.js');
const headerCheckerMiddleware = require('./middleware');

const app = express();

// Use the middleware
app.use(headerCheckerMiddleware);
// Use the router
app.use('/api', router);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
