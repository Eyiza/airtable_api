require('dotenv').config();
const port = process.env.PORT || 3000

module.exports = {
    openapi: '3.0.1',
    info: {
      title: 'Airtable API',
      version: '1.0.0',
      description: 'API documentation generated with Swagger',
    },
    tags: [
      {
        name: 'Airtable CRUD operations',
      },
    ],
    servers: [
      {
        url: `http://localhost:${port}`,
        description: 'Local server',
      },
    ]
};
