const mongoose = require("mongoose");

const TeaSchema = new mongoose.Schema({
    name: {type:String, required:true},
    image: String,
});

const Tea = mongoose.model('Tea', TeaSchema);

module.exports = Tea;

/*
{
    "name": "Jasmine Tea",
    "image": "an image file url",
    "description": "Jasmine tea (茉莉花茶) is tea scented with the aroma of jasmine blossoms.",
    "keywords": "aromatic, china, sweet",
    "origin":"China",
    "brew_time": 2,
    "temperature": 80,
    "comments": []
}
*/