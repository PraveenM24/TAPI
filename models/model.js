const mongoose = require("mongoose"); //import mongoose

// tea schema
const dataSchema = new mongoose.Schema({
    name: {
        type:String, 
        required:true
    },
    image: String,
    content: {
        type: String,
        required: true
    },
    created: {
        type: String,
        required: true
    }
});

const Data = mongoose.model('Data', dataSchema); //convert to model named Tea
module.exports = Data; //export for controller use
