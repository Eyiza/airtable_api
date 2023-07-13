module.exports = {
    get:{
        tags: ['Airtable CRUD operations'],
        description: "Search records by name",
        operationId: 'searchRecords',
        parameters:[
            {
                name: 'name',
                in: 'query',
                schema: {
                  type: 'string',
                },
                required: true,
                description: 'Name to search for',
                example: 'John',
              }
        ],
        responses:{
            '200':{
                description:"Record(s) fetched successfully",
                content:{
                    'application/json':{
                        schema:{
                            $ref:'#/components/schemas/Record'
                        }
                    }
                }
            },
            '400': {
                description: 'Bad request',
            },
            '404':{
                description: "No records found",
                content:{
                    'application/json':{
                        schema:{
                            $ref:'#/components/schemas/Error',
                            example:{
                                message:"Records with the provided name does not exist",
                            }
                        }
                    }
                }
            },
            '500': {
                description: 'Server error',
            },
        },
    }
}