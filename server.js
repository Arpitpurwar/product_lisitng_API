const express = require('express');
const app = express();
const { connectDb,getConnection } = require('./database/connection');


connectDb().then((dbb)=>{
   app.listen(4000,()=>{
        console.log('Server is running on port 4000');
    })
})

