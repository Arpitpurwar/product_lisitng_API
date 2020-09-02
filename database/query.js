const { runQuery } = require('./connection');
const { PRODUCTS_FIELD,CATEGORY_FIELD } = require('../columns/products.json');

async function listAllProducts (){
    let tempQuery = `select ${PRODUCTS_FIELD} from dbo.Product P inner join dbo.Category C on C.ID  = P.CATEGORYID;`;
    let result = await runQuery(tempQuery);
    if(result.length > 0){
        return result
    }
    else{
          return {
              "status" : "successs",
              "message" : "products are not avaliable in database"
          }  
    }
  
}

async function listAllCategories (){
    let tempQuery = `select ${CATEGORY_FIELD} from dbo.Category;`;
    let result = await runQuery(tempQuery);
    if(result.length > 0){
        return result
    }
    else{
          return {
              "status" : "successs",
              "message" : "categories are not avaliable in database"
          }  
    }
  
}

async function listProductForSpecificCategory (categoryid){
    let tempQuery = `select ${PRODUCTS_FIELD} from dbo.Product where CATEGORYID = ${categoryid};`;
    let result = await runQuery(tempQuery);
        if(result.length > 0){
            return result
        }
        else{
              return {
                  "status" : "successs",
                  "message" : "data is not avaliable for this category"
              }  
        }
}

async function getCartProductForSpecificUser (userid){
    let tempQuery = `select P.NAME as PRODUCT_NAME,P.DESCRIPTION,P.PRICE,P.MAKE,U.USER_NAME,UC.USER_ID,C.NAME as CATEGORY_NAME from dbo.UserCart UC inner join dbo.Product P on UC.PRODUCT_ID = P.ID
    inner join dbo.Users U on UC.USER_ID = U.ID inner join dbo.Category C on C.ID  = P.CATEGORYID
    where UC.USER_ID = ${userid};`;
    let result = await runQuery(tempQuery);
    if(result.length > 0){
        return result
    }
    else{
          return {
              "status" : "successs",
              "message" : "data is not avaliable for this User"
          }  
    }
  
}

async function addProductToCart (data){
    console.log("result",data);
    if(data.PRODUCT_ID && data.USER_ID ){
        let tempQuery = `Insert into dbo.UserCart (PRODUCT_ID,USER_ID) values(${data.PRODUCT_ID},${data.USER_ID})`;
        console.log(tempQuery);
        let result = await runQuery(tempQuery);
        console.log(result);
        return result



    }else{
        return {
            "status" : "success",
            "stauscode": 401,
            "message" : "required fields are missing"
        } 
    }

  
}

async function login (data){
 
    let tempQuery = `select PASSWORD from dbo.Users where USER_NAME = '${data.USER_NAME}'`;
    let result = await runQuery(tempQuery);
         if(result.length > 0){
            return result[0].PASSWORD === data.PASSWORD ? true : false
        }
        else{
              return false
        } 
        
    }



module.exports = {
    listAllProducts,
    listAllCategories,
    listProductForSpecificCategory,
    getCartProductForSpecificUser,
    addProductToCart,
    login
}