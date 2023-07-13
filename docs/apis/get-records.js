module.exports = {
    get:{
        tags: ['Airtable CRUD operations'],
        description: "Get records",
        operationId: 'getRecords',
        parameters:[],
        responses:{
            '200':{
                description:"Data fetched successfully",
                content:{
                    'application/json':{
                        schema:{
                            $ref:'#/components/schemas/Record'
                        }
                    }
                }
            }
        }
    }
}