module.exports = {
    get:{
        tags: ['Airtable CRUD operations'],
        description: "Get a record",
        operationId: 'getRecord',
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
                description: "A single record id"
            }
        ],
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
            },
            '404':{
                description: "Record is not found",
                content:{
                    'application/json':{
                        schema:{
                            $ref:'#/components/schemas/Error',
                            example:{
                                message:"We can't find the record",
                                internal_code:"Invalid id"
                            }
                        }
                    }
                }
            }
        }
    }
}