//import data model
const Data = require('../models/model');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
      },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const uploadImg = multer({storage: storage}).single('image');

//GET all teas
const getAllData = (req, res) => {
    Data.find({}, (err, data)=>{
        if (err){
            return res.json({Error: err});
        }
        return res.json(data);
    })
};

//POST tea
const newData = (req, res) => {
    //check if the tea name already exists in db
    Data.findOne({name:req.body.name},(data)=>{

        //if tea not in db, add it
        if(data===null){
            //create a new tea object using the Tea model and req.body
            const newData = new Data({
                name:req.body.name,
                image: req.file.path, 
                content: req.body.content,
                created: req.body.created,
            })

            // save this object to database
            newData.save((err, data)=>{
                if(err) return res.json({Error: err});
                return res.json(data);
            })
        //if tea is in db, return a message to inform it exists            
        }else{
            return res.json({message:"Data already exists"});
        }
    })    
};


//DELETE teas
const deleteAllData = (req, res) => {
    Data.deleteMany({}, err => {
        if(err) {
          return res.json({message: "Complete delete failed"});
        }
        return res.json({message: "Complete delete successful"});
    })
};


const getOneData = (req, res) => {
    let name = req.params.name; //get the tea name

    //find the specific tea with that name
    Data.findOne({name:name}, (err, data) => {
    if(err || !data) {
        return res.json({message: "Data doesn't exist."});
    }
    else return res.json(data); //return the tea object if found
    });
};

//DELETE 1 tea
const deleteOneData = (req, res) => {
    let name = req.params.name; // get the name of tea to delete

    Data.deleteOne({name:name}, (err, data) => {
    if(err || !data) {
        return res.json({message: "Data doesn't exist."});
    }
    else return res.json({message: "Data deleted."}); //deleted if found
    });
};


//export controller functions
module.exports = {
    getAllData, 
    uploadImg,
    newData,
    deleteAllData,
    getOneData,
    deleteOneData
};

