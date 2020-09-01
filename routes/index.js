const express = require('express');
const router = express.Router();





// router.post('/login', function (req, res) {
//     query.login(req.body.email, req.body.password, function (err, result) {
//       if (err) {
//         logger.error("Error in login API ", err);
//         res.status(404).send(err);
//       } else {
//         req.session.login = true;
//         res.send(result);
//       }
//     });
  
//   })


  // Logout
  router.post('/logout', function(req, res, next) {
    req.session.destroy();
    res.json({"msg":"Session is successfully destroyed"});
});




module.exports = router;