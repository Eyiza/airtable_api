module.exports = {
    patch:{
        tags:['Airtable CRUD operations'],
        description: "Update record",
        operationId: "updateRecord",
        security: [
            {
              ApiKeyAuth: [],
            },
        ],
        parameters:[
            {
                name:"id",
                in:"path",
                schema:{
                    $ref:"#/components/schemas/id"
                },
                required:true,
                description: "Id of record to be updated"
            }
        ],
        requestBody: {
            content:{
                'application/json': {
                    schema:{
                        $ref:'#/components/schemas/DataUpdate'
                    }
                }
            },
            description: "Fields to be updated. Can be one or more"
        },
        responses:{

            '200':{
                description: "Record updated successfully"
            },
            '404':{
                description: "Record not found"
            },
            '500':{
                description: "Server error"
            }
            
        }
    }
}