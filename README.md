# Product Listing API

# Consideration
1) User has already exists in system. 

// APIS
 1) login
http://localhost:4000/api/login
POST
Request Payload :
{
    "USER_NAME" : "arpit12",
    "PASSWORD" :  "admin123"
}

2) Logout
http://localhost:4000/api/logout
GET
{
    "PRODUCT_ID" : 5,
    "USER_ID" :  2
}

3) List all Prdoucts
http://localhost:4000/api/listAllProducts
GET

4) List all categories
http://localhost:4000/api/listAllCategories
GET

5) List product for specific category
http://localhost:4000/api/listProductForSpecificCategory/1
GET

6) Get Cart Product for specific user
http://localhost:4000/api/getCartProductForSpecificUser/1
GET

7) Add products to cart
http://localhost:4000/api/addProductToCart
POST
Request Payload :
{
    "USER_ID" : "arpit12",
    "PRODUCT_ID" :  "admin123"
}