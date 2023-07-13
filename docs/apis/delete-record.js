module.exports = {
    delete:{
        tags: ['Airtable CRUD operations'],
        description: "Deleting a record",
        operationId: "deleteRecord",
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
                description: "Deleting a record"
            }
        ],
        responses:{
            '200':{
                description:"Record deleted successfully"
            },
            '404':{
                description:"Record not found"
            },
            '500':{
                description:"Server error"
            }
        }
    }
}