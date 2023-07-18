const {Schema, model} = require('mongoose');

const duplicateSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        level: String, 
        age: Number,
        dob: Date,
    },
    {
        timestamps: true
    }
);

const duplicateModel = model('Duplicate', duplicateSchema);

module.exports = duplicateModel;