module.exports = {
    post:{
        tags:['Airtable CRUD operations'],
        description: "Create record",
        operationId: "createRecord",
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