const { runQuery } = require('./connection');
const { PRODUCTS_FIELD } = require('../columns/products.json');

async function listAllProducts (){
    let tempQuery = `select ${PRODUCTS_FIELD} from dbo.Product;`;
    return await runQuery(tempQuery);
  
}

async function listAllCategories (){
    let tempQuery = `select ${CATEGORY_FIELD} from dbo.Product;`;
    return await runQuery(tempQuery);
  
}

async function listProductForSpecificCategory (categoryid){
    let tempQuery = `select ${PRODUCTS_FIELD} from dbo.Product where CATEGORYID = ${categoryid};`;
    return await runQuery(tempQuery);
  
}

async function getCartProductForSpecificUser (userid){
    let tempQuery = `select ${PRODUCTS_FIELD} from dbo.Product where CATEGORYID = ${categoryid};`;
    return await runQuery(tempQuery);
  
}


module.exports = {
    listAllProducts,
    listAllCategories,
    listProductForSpecificCategory,
    getCartProductForSpecificUser
}