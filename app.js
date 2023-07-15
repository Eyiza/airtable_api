const express = require('express');
const router = require('./router.js');
const bodyParser = require('body-parser');
const headerCheckerMiddleware = require('./middleware');
const swaggerUi = require('swagger-ui-express');
const docs = require('./docs');
const morgan = require("morgan");
const cors = require("cors");

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json()); // To parse JSON data
app.use(cors());
app.use(headerCheckerMiddleware); // Use the middleware
app.use('/api/airtable', router); // Use the router
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(docs));


// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
