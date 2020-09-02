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
          console.log("DB Connected");
          return db;

   
    } catch (err) {
        // ... error checks
    }
}

function runQuery(query) {
  console.log("Query",query);
    return new Promise((resolve, reject) => {
        try {
            db.query(query, function (err, result) {
                if (err) {
                    let errString = `${err}`; 
                    let msg=errmsg[err.number]
                    reject(
                      { 
                        STATUS:500,
                        "SUCCESS": false, 
                        "MESSAGE": !msg?'There is some problem in execution. Please contact application administrator':msg.custommsg,
                        "MESSAGESQL": errString           
                      })
                }
                else {
                    if (result.recordset == undefined) {
                      console.log('result set undefined');
                        resolve({ "SUCCESS": true, "MESSAGE": "Query run successfully" });
                    }
                    else {
                      console.log('result set ');
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

var getConnection = function(){
    return db;
  }


  module.exports = { getConnection,connectDb,runQuery }