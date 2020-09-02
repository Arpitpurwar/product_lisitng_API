const sql = require('mssql/msnodesqlv8');

require('dotenv').config();


let db; 

async function connectDb() {
    try {
        let dbConfig = {
            server: process.env.server,
            database: process.env.databaseName,
            user: process.env.userid,
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
          console.log("DB Connected");
          return db;

   
    } catch (err) {
        // ... error checks
        console.log("DB Connected");
        return err;
    }
}

function runQuery(query) {
    return new Promise((resolve, reject) => {
        try {
            db.query(query, function (err, result) {
                if (err) {
                    let errString = `${err}`; 
                    reject(
                      { 
                        STATUS:500,
                        "SUCCESS": false, 
                        "MESSAGE": 'There is some problem in execution. Please contact application administrator',
                        "MESSAGESQL": errString           
                      })
                }
                else {
                    if (result.recordset == undefined) {
                        resolve({ "SUCCESS": true, "MESSAGE": "product is added to cart successfully" });
                    }
                    else {
                        resolve(result.recordset);
                    }
            }
        });
      }
        catch (e) {
         
            reject({ "STATUS":500,
                    "SUCCESS": false,
                    "MESSAGE": e.error
            });
        }
  
    })
}




  module.exports = { connectDb,runQuery }