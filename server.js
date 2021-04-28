const express = require ('express');
const routes = require('./routes/route'); // import the routes
const mongoose = require('mongoose'); //import mongoose
const app = express();
const helmet = require('helmet');
const compression = require('compression');

require('dotenv').config();

app.use(express.json());
app.use(helmet());
app.use('/', routes); //to use the routes
app.use('/uploads', express.static('./uploads'));   
app.use(compression());

const listener = app.listen(process.env.PORT || 3000, () => {
    console.log('Your app is listening on port ' + listener.address().port)
})


 //establish connection to database
 mongoose.connect(
     process.env.MONGODB_URI,
     { useFindAndModify: false, useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true},
     (err) => {
         if (err) return console.log("Error: ", err);
         console.log("MongoDB Connection -- Ready state is:", mongoose.connection.readyState);
     }
 );
 