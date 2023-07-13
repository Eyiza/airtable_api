module.exports = {
    post:{
        tags:['Airtable CRUD operations'],
        description: "Create record",
        operationId: "createRecord",
        security: [
            {
              ApiKeyAuth: [],
            },
        ],
        parameters:[],
        requestBody: {
            content:{
                'application/json': {
                    schema:{
                        $ref:'#/components/schemas/DataInput'
                    }
                }
            }
        },
        responses:{
            '200':{
                description: "Record created successfull"
            },
            '500':{
                description: 'Server error'
            }
        }
    }
}