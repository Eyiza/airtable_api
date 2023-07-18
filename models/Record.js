const {Schema, model} = require('mongoose');

const recordSchema = new Schema(
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

const recordModel = model('Record', recordSchema);

module.exports = recordModel;