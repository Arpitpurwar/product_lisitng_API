/* eslint-disable max-len */
'use strict';

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {listAllProducts, listAllCategories, listProductForSpecificCategory, getCartProductForSpecificUser, addProductToCart, login} = require('../database/query');


router.post('/login', function(req, res) {
  if (req.body.USER_NAME && req.body.PASSWORD){

    login(req.body).then((result) => {
      if (result){
        let token = jwt.sign({ ID: result[0].ID, USER_NAME: result[0].USER_NAME}, 'wteurtfcvfdjd34654', {
          expiresIn: 86400,
        });
        res.send({
          status: 'success',
          'auth-token': token,
          message: 'user has successfully logged in. use above auth-token to acess other APIS',
        });
      } else {
        res.send({
          status: 'successs',
          message: 'username or password is wrong',
        });
      }

    }).catch(err => res.status(500).send(err));

  } else {
    res.send({
      status: 'success',
      stauscode: 401,
      message: 'required fields are missing',
    });
  }

});


router.use(function(req, res, next) {
  let token = req.headers['authorization'];
  if (!token){
    return res.status(403).send(
      {
        status: 'success',
        message: 'Please sign-in and get auth-token to acess APIS',
      });
  }

  jwt.verify(token, 'wteurtfcvfdjd34654', function(err, decoded) {
    if (err){
      return res.status(500).send({
        status: 'success',
        message: 'Please sign-in and get auth-token to acess APIS',
      });
    }

    next();
  });

});

router.get('/listAllProducts', function(req, res){
  listAllProducts().then(data => res.send(data)).catch(err => res.status(500).send(err));
});

router.get('/listAllCategories', function(req, res){
  listAllCategories().then(data => res.send(data)).catch(err => res.status(500).send(err));
});

router.get('/listProductForSpecificCategory/:categoryID', function(req, res){
  listProductForSpecificCategory(req.params.categoryID).then(data => res.send(data)).catch(err => res.status(500).send(err));
});

router.get('/getCartProductForSpecificUser/:userID', function(req, res){
  getCartProductForSpecificUser(req.params.userID).then(data => res.send(data)).catch(err => res.status(500).send(err));
});

router.post('/addProductToCart', function(req, res){
  addProductToCart(req.body).then(data => res.send(data)).catch(err => res.status(500).send(err));
});
module.exports = router;
