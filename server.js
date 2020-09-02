'use strict'
const express = require('express');
const app = express();
const { connectDb } = require('./database/connection');
const bodyParser = require('body-parser');
const expressSession = require('express-session');

app.use(expressSession(
    { secret: "Qwertyuio45fgggfft",
     resave: false,
     saveUninitialized: true,
     cookie: { maxAge:8*60*60*1000, secure : false}
    }));

app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json({limit: '50mb'})); 



const route = require('./routes');
app.use('/api',route);


 connectDb().then( (db) => {
     let port = process.env.PORT || 4000;
        app.listen(port,()=>{
             console.log(`Server is running on port ${port}`);
         })
     }).catch( err => console.log("Please restart the server ",err));
    
