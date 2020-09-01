const sql = require('mssql/msnodesqlv8');

require('dotenv').config();


let db; 

async function connectDb() {
    try {
        let dbConfig = {
            server: process.env.server,
            database: process.env.databaseName,
            user: 'test',
            password: process.env.password,
            driver: sql,
            enableArithAbort:false,
            options: 
            {
              trustedConnection: false,
              encrypt:true
            }
          };
      
          let pool  = await sql.connect(dbConfig);
          db = await pool.request();
          console.log("DB Connected")
;          return db;

   
  
    } catch (err) {
        // ... error checks
    }
}



var getConnection = function(){
    return db;
  }


  module.exports = { getConnection,connectDb }