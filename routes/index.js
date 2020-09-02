const express = require('express');
const router = express.Router();
const {listAllProducts,listAllCategories,listProductForSpecificCategory,getCartProductForSpecificUser, addProductToCart, login} = require('../database/query');




router.post('/login', function (req, res) {
  if(req.body.USER_NAME && req.body.PASSWORD){

    login(req.body).then((result) => {
      if(result){
        req.session.login = true;
        res.send({
          "status" : "successs",
          "message" : "user has successfully logged in"
      }  );
      }else{
        res.send({
          "status" : "successs",
          "message" : "username or password is wrong"
      }  )
      }
   
    }).catch(err => res.status(500).send(err))
    
  }
  else{
    res.send({
        "status" : "success",
        "stauscode": 401,
        "message" : "required fields are missing"
    }) 
}
  
  })


  // Logout
  router.post('/logout', function(req, res, next) {
    req.session.destroy();
    res.json({"status" : "successs",
    "message" : "user has successfully logged out"
});
});

router.use(function (req, res, next) {
  console.log(" Session ID ", req.session.id);

  if (req.session.login) {
	  next();
  }
  else {
    res.status(401).send({
      "status" : "success",
      "stauscode": 401,
      "message" : "please authenticate first to acess APIS"
  } );
  }
});

router.get('/listAllProducts',function(req,res){
  listAllProducts().then( data => res.send(data)).catch( err => res.status(500).send(err));
})

router.get('/listAllCategories',function(req,res){
  listAllCategories().then( data => res.send(data)).catch( err => res.status(500).send(err));
})

router.get('/listProductForSpecificCategory/:categoryID',function(req,res){
  listProductForSpecificCategory(req.params.categoryID).then( data => res.send(data)).catch( err => res.status(500).send(err));
})

router.get('/getCartProductForSpecificUser/:userID',function(req,res){
  getCartProductForSpecificUser(req.params.userID).then( data => res.send(data)).catch( err => res.status(500).send(err));
})

router.post('/addProductToCart',function(req,res){
  addProductToCart(req.body).then( data => res.send(data)).catch( err => res.status(500).send(err));
})
module.exports = router;