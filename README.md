## Table of Contents
- [Airtable API Project](#airtable-api-project)
  - [Built with](#built-with)
  - [Getting Started](#getting-started)
  - [Pre-requisites and Local Development](#pre-requisites-and-local-development)
  - [Installation](#installation)
  - [Middleware](#middleware)
  - [Mail Server](#mail-server)
  - [Error Handling](#error-handling)
  - [API Endpoints](#api-endpoints)
      - [GET /api/airtable - Retrieve all records from the Airtable base.](#get-apiairtable---retrieve-all-records-from-the-airtable-base)
      - [POST /api/airtable - Create a new record in the Airtable table.](#post-apiairtable---create-a-new-record-in-the-airtable-table)
      - [GET /api/airtable/:id - Retrieve a specific record by its ID.](#get-apiairtableid---retrieve-a-specific-record-by-its-id)
      - [PATCH /api/airtable/:id - Update a specific record by its ID.](#patch-apiairtableid---update-a-specific-record-by-its-id)
      - [DELETE /api/airtable/:id - Delete a specific record by its ID.](#delete-apiairtableid---delete-a-specific-record-by-its-id)
      - [GET /api/airtable/search?name=query - Retrieve records that match the given name query.](#get-apiairtablesearchnamequery---retrieve-records-that-match-the-given-name-query)
  - [Redis Cache](#redis-cache)
  - [Cron Job](#cron-job)
      - [GET /api/airtable/start-cron - Start the cron job to send periodic emails containing the number of records in the Airtable base.](#get-apiairtablestart-cron---start-the-cron-job-to-send-periodic-emails-containing-the-number-of-records-in-the-airtable-base)
      - [GET /api/airtable/stop-cron - Stop the cron job from sending further emails.](#get-apiairtablestop-cron---stop-the-cron-job-from-sending-further-emails)
  - [Tests](#tests)
  - [Automation Script](#automation-script)
      - [Adding a Trigger to Airtable](#adding-a-trigger-to-airtable)
      - [Testing locally with ngrok](#testing-locally-with-ngrok)
  - [Deployment N/A](#deployment-na)
  - [Author](#author)


# Airtable API Project

This project is a Node.js application that provides a CRUD (Create, Read, Update, Delete) API for working with Airtable. It allows you to interact with an Airtable database using HTTP requests.

## Built with
  * [NodeJS](https://nodejs.org/) and [Express](https://expressjs.com/) 
  * [Airtable](https://airtable.com/)
  * [MongoDB](https://www.mongodb.com/)
  * [Redis](https://redis.io/)
  * Hosting: [Render](https://render.com/)


## Getting Started
Download the project code locally
[Fork](https://help.github.com/en/articles/fork-a-repo) the project repository and [clone](https://help.github.com/en/articles/cloning-a-repository) your forked repository to your machine. 


## Pre-requisites and Local Development 
Developers using this project should already have Nodejs and Node Package Manager (NPM) installed on their local machines.


## Installation

1. **NPM Dependencies** - Install the required dependencies by navigating to the your project directory on the terminal and running:
```
npm install // only once to install dependencies
```
All required packages are included in the `package.json` file. 


2. **Set up the Airtable Database**
- Create an account on [Airtable](https://airtable.com/).
- Create a new base.
- Create a table and name it `Demo`.
- Create the following columns: "Name", "Level", "DOB", "Age" with appropriate datatypes.
- Create a new API key and copy it.
- Copy your base ID from the API documentation page.


3. **Configuration** <br> Before running the application, you need to configure your Airtable credentials. Create a `.env` file at root level and add the following to it (otherwise hard code their strings in airtable.service.js file).
```
API_KEY=your_api_key
BASE_ID=your_base_id
``` 

Note - In this project, the table's name i.e `Demo` is used to reference the table. Optionally, you can use the id of the table. <br>
To get the id of the table, go to the Airtable API documentation and click on the table you want to use. The id of the table is the last part of the url.


4. **Set up your MONGO Database** <br>
Configure the MongoDB connection by adding your MongoDB connection string to your `.env` file:
```
MONGO_URL='MONGODB_URI=mongodb+srv://{username}:{password}@{cluster-host}/{database-name}?retryWrites=true&w=majority'
```


5. **Run the development server** <br>
To run the application run the following commands from the project directory: <br>
```
npm run dev 
// or
npm start
```

By default, the application will run on `http://localhost:3000`. 


## Middleware
A Middleware has been implemented to compare the `X-Airtable` header in each request with the value stored in the `.env` file. Add the following to your `.env` file:
```
AUTHORIZATION='Random_Authorization_Key'
```
This provides an additional layer of security for your API.


## Mail Server
This application uses [NodeMailer](https://nodemailer.com/) Package to handle emails. Add the following to your `.env` file to set up the environment variables of the mailing server of your application (otherwise hard code the string ```EMAILUSER```, ```EMAILPASS``` and ```RECIPIENTS``` in mail.service.js file):<br> 
```
EMAILUSER=example@gmail.com
EMAILPASS=password
RECIPIENTS=example@gmail.com,example2@gmail.com
``` 

Google has a two-factor authentication (2FA) feature, which requires you to use an application-specific password to access your account when using a third-party application like Node to send emails through Gmail. Therefore, you'll need to generate an application-specific password and use that password in your Node app instead of your regular Gmail password.<br>
Here are the steps to generate an application-specific password:
- Go to your Google account's security page at [myaccount.google.com/security](https://myaccount.google.com/security).
- 2-step verification must be turned on for your gmail account.
- Scroll down to the "Signing in to Google" section and click on "App passwords".
- Select "Mail" and "Other (custom name)" as the app and device, respectively.
- Enter a name for the custom app password (e.g. "Airtable CronJob password") and click on "Generate".
- Google will generate a new password for you. Copy this password and use it in your Node app's email configuration (EMAILPASS) instead of your regular Gmail password.


## Error Handling
Errors are returned as JSON objects in the following format:
```
{
    status: 'error' 
    error: 'Unprocessable', 
    message: error.message"
}
```
The API will return the following error types when requests fail:
- 400: Bad Request
- 401: Unauthorized request
- 404: Resource Not Found
- 405: Method not allowed
- 422: Not Processable
- 500: Internal server error


## API Endpoints 

#### GET /api/airtable - Retrieve all records from the Airtable base.
- Sample URL: `http://127.0.0.1:3000/api/airtable`
- Request Arguments: None
- Request Headers:
    - X-Airtable: Random_Authorization_Key matching the one saved in the `.env` file (required for every request).
- Response body:
  - Returns details of records in airtable base. 
```
{
    "status": "success",
    "message": "Data fetched successfully",
    "data": [
        {
            "id": "rec0ZQ4ZQ4ZQ4ZQ4Z",
            "name": "John",
            "level": "Beta",
            "DOB": "2006-10-01",
            "age": 23
        },
        {
            "id": "rec0ZQ4ZQ4ZQ4ZQ4Z",
            "name": "Joe",
            "level": "Alpha",
            "DOB": "1998-01-01",
            "age": 23
        }
    ]
}     
```

#### POST /api/airtable - Create a new record in the Airtable table.
- Sample URL: `http://127.0.0.1:3000/api/airtable`
- Request Arguments: Name, Level, Age, DOB.
- Request Headers:
    - X-Airtable: Random_Authorization_Key matching the one saved in the `.env` file (required for every request).
- Response body:
  - Creates a new record using the provided Name, Level, Age and DOB.
  - Returns success value, a 'Record created successfully' message and details of created record.
```
{
    "status": "success",
    "message": "Record created successfully",
    "data": {
        "Name": "Joe",
        "Level": "Alpha",
        "Age": 26
    }
}
```

#### GET /api/airtable/:id - Retrieve a specific record by its ID.
- Sample URL: `http://127.0.0.1:3000/api/airtable/rec0ZQ4ZQ4ZQ4ZQ4Z`
- Request Arguments: None
- Request Headers:
    - X-Airtable: Random_Authorization_Key matching the one saved in the `.env` file (required for every request).
- Response body:
  - Returns details of record if it exists. Otherwise, it returns 'Invalid Id' 
```
{
    "status": "success",
    "message": "Data fetched successfully",
    "data": [
        {
            "id": "rec0ZQ4ZQ4ZQ4ZQ4Z",
            "name": "John",
            "level": "Beta",
            "DOB": "2006-10-01",
            "age": 23
        }
    ]
} 
    
```

#### PATCH /api/airtable/:id - Update a specific record by its ID.
- Sample URL: `http://127.0.0.1:3000/api/airtable/rec0ZQ4ZQ4ZQ4ZQ4Z`
- Request Arguments: Field to be updated.
- Request Headers:
    - X-Airtable: Random_Authorization_Key matching the one saved in the `.env` file (required for every request).
- Response body:
  - Returns success value and a 'Record updated successfully' message.
  - If record does not exists, it returns 'Invalid Id'.
```
{
  "status": "success",
  "message": "Record updated successfully"
}
```

#### DELETE /api/airtable/:id - Delete a specific record by its ID.
- Sample URL: `http://127.0.0.1:3000/api/airtable/rec0ZQ4ZQ4ZQ4ZQ4Z`
- Request Arguments: None
- Request Headers:
    - X-Airtable: Random_Authorization_Key matching the one saved in the `.env` file (required for every request).
- Response body:
  - Returns success value and a 'Record deleted successfully' message.
  - If record does not exists, it returns 'Invalid Id'.
```
{
  "status": "success",
  "message": "Record deleted successfully"
}
```


#### GET /api/airtable/search?name=query - Retrieve records that match the given name query.
- Sample URL: `http://127.0.0.1:3000/api/airtable/search?name=Joe`
- Request Arguments: None
- Request Headers:
    - X-Airtable: Random_Authorization_Key matching the one saved in the `.env` file (required for every request).
- Response body:
  - Returns records with the provided name. 
  - If no record matching condition exist, it returns 'No record found'.
```
{
    "status": "success",
    "message": "Data fetched successfully",
    "data": [
        {
            "id": "rec0ZQ4ZQ4ZQ4ZQ4Z",
            "name": "Joe",
            "level": "Alpha",
            "DOB": "1998-01-01",
            "age": 23
        }
    ]
}     
```

**These endpoints can be tested using an API testing tool like Postman, cURL or Swagger.** 


## Redis Cache
This application utilizes a [Redis Cache](https://redis.io/) to store the number of records in the Airtable base. When a request is made to fetch the number of records, the application checks if the value exists in the Redis cache. If it does, the value is retrieved from the cache. If not, the application fetches the value from the Airtable API, stores it in the cache, and returns the value to the client.<br>
Please note that you will need to have Redis installed and running on your system or have access to a Redis server in order to use the Redis cache in your application. You can learn more about Redis and how to set it up by referring to the official [Redis documentation](https://redis.io/documentation).<br>
This cache helps improve performance by reducing the number of requests made to the Airtable API. The Redis cache is implemented using the [redis](https://www.npmjs.com/package/redis) package. 


## Cron Job
A Cron job has been implemented using the [node-cron](https://www.npmjs.com/package/node-cron) package to send an email containing the number of records in the Airtable base every 15 minutes to the recipients given in the `.env` files. 
The application includes a cron job controller that can be started and stopped using the following endpoints:

#### GET /api/airtable/start-cron - Start the cron job to send periodic emails containing the number of records in the Airtable base.
- Sample URL: `http://127.0.0.1:3000/api/airtable/start-cron`
- Request Arguments: None
- Request Headers:
    - X-Airtable: Random_Authorization_Key matching the one saved in the `.env` file (required for every request).
- Response body:
```
Cron job started   
```

#### GET /api/airtable/stop-cron - Stop the cron job from sending further emails.
- Sample URL: `http://127.0.0.1:3000/api/airtable/stop-cron`
- Request Arguments: None
- Request Headers:
    - X-Airtable: Random_Authorization_Key matching the one saved in the `.env` file (required for every request).
- Response body:
```
Cron job stopped
```


## Tests
1. Test your endpoints with [Postman](https://getpostman.com).
   - Import the [postman collection] (`./airtable.postman_collection.json`)
   - Right-clicking the collection folder, navigate to the edit tab, then the variables section and update the host variable to your running server link.
   - Run the collection individually.

2. This application also includes a [Swagger](https://swagger.io/) documentation that can be accessed at [http://localhost:3000/api-docs](http://localhost:3000/api-docs) after starting the server.


## Automation Script
An automation script has been implemented to store updated records in MongoDB when a record is updated in Airtable. If a record already exists in MongoDB, it will be updated with the latest data. <br>

#### Adding a Trigger to Airtable
To add a trigger to your Airtable base, follow these steps:
- Go to your Airtable base on the Airtable website.
- Click on the "Automations" tab.
- Create a new automation rule based on the event you want to trigger the webhook. For example, you can choose the "When record updated" event.
- Configure the trigger conditions as needed.
- In the actions section, select the "Send webhook" action.
- Enter the URL of your server's endpoint where the webhook will be received. For example, `{{url}}/api/airtable/webhook`.
- Save the automation rule.
Now, whenever the specified event occurs in your Airtable base, the webhook will be triggered and your server will receive the request at the designated endpoint `{{url}}/api/airtable/webhook`. 
The webhook request is then handled in the [Webhook Controller](./controllers/webhook.controller.js) file.

#### Testing locally with ngrok
To test the webhook locally, you can use [ngrok](https://ngrok.com/). <br>
- Install ngrok by following the instructions on the [ngrok](https://ngrok.com/) website.
- Start your server by running the command:
```
npm start
```
- Run the following command in your terminal to start ngrok on port 3000:
```
ngrok http 3000
```
- Copy the forwarding URL generated by ngrok and use it as the webhook URL in your Airtable automation rule. For example, `https://1190-41-58-87-97.ngrok-free.app`. A sample automation script can look like so:
``` 
const axios = require('axios');
let config = input.config();
console.log(config);
let response = await axios.post('https://1190-41-58-87-97.ngrok-free.app/webhook/test', {
    data: config,
    modelName: 'test',
});
console.log(response.data);
```
- Start your server and update a record in your Airtable base. <br>
You should see the request received by your server in the terminal. <br>


## Deployment N/A
[Render.com](https://airtable-crud.onrender.com)

## Author
Precious Michael
