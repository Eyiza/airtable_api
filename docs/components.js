
module.exports = {
    components:{
        schemas:{
            id:{
                type:'string',
                description:"An id of a record",
                example: "recgMBt5FZPxbZ8eW"
            },
            Record:{
                type:'object',
                properties:{
                    id:{
                        type:'string',
                        description:"User identification number",
                        example:"recgMBt5FZPxbZ8eW"
                    },
                    name:{
                        type:'string',
                        description:"User's name",
                        example:"John Doe"
                    },
                    level:{
                        type:'string',
                        description:"User's level",
                        example:"Alpha"
                    },
                    DOB:{
                        type:'date',
                        description:"User's date of birth",
                        example:"2023-06-20"
                    },
                    age:{
                        type:'integer',
                        description:"User's age",
                        example:23
                    },
                    
                }
            },
            DataInput:{
                type:'object',
                properties:{
                    Name:{
                        type:'string',
                        description:"User's name",
                        example:"John Doe"
                    },
                    Level:{
                        type:'string',
                        description:"User's level",
                        example:"Alpha"
                    },
                    DOB:{
                        type:'date',
                        description:"User's date of birth",
                        example:"2023-06-20"
                    },
                    Age:{
                        type:'integer',
                        description:"User's age",
                        example:23
                    },
                }
            },
            DataUpdate:{
                type:'object',
                properties:{
                    Name:{
                        type:'string',
                        description:"User's name",
                        example:"John Doe"
                    },
                    Age:{
                        type:'integer',
                        description:"User's age",
                        example:23
                    },
                }
            },
            Error:{
                type:'object',
                properties:{
                    message:{
                        type:'string'
                    },
                    internal_code:{
                        type:'string'
                    }
                }
            }
        }
    }
}