const express = require('express');
const app = express();
const { connectDb } = require('./database/connection');



const route = require('./routes');
 app.use('/api',route);


connectDb().then( (db) => {
   app.listen(4000,()=>{
        console.log('Server is running on port 4000');
    })
});




