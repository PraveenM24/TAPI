const express = require ('express');
const cors = require('cors');
const routes = require('./routes/route'); // import the routes
const mongoose = require('mongoose'); //import mongoose
const app = express();
app.use(cors())

const helmet = require('helmet');
const compression = require('compression');

require('dotenv').config();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

app.use(express.json());
app.use(helmet());

app.use('/', routes); //to use the routes
app.route('/')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/index.html');
});
app.use('/uploads', express.static('./uploads'));   
app.use(compression());

const listener = app.listen(process.env.PORT || 3000, () => {
    console.log('Your app is listening on port ' + listener.address().port)
})


 //establish connection to database
 mongoose.connect(
    'mongodb+srv://admin:admin@cluster0.cw97v.mongodb.net/Data?retryWrites=true&w=majority',
     {  useFindAndModify: false, 
        useUnifiedTopology: true, 
        useNewUrlParser: true, 
        useCreateIndex: true,
        server: { 
            socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } 
         }, 
         replset: {
            socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } 
         }
    },
     (err) => {
         if (err) return console.log("Error: ", err);
         console.log("MongoDB Connection -- Ready state is:", mongoose.connection.readyState);
     }
 );
 