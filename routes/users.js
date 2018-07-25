var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');

/* GET users listing. */
router.get('/createuser', function(req, res, next) {
  res.render('index',{title: 'signup'});
});

router.post('/createuser', function(req, res, next) {
  
  userController.createUser(req.body, function(err, user) {
    if (err) {
      res.json({
        message: 'Fail',
        error: err
      });
      return;
    }
    res.json({
      message: 'Success',
      data: user
    });
    return;
  });
});

// router.post('/login', function(req, res, next) {
//   res.json({
//     data:req.body
//   })

  // userController.loginUser(req.body, function(err, user) {
  //   if (err) {
  //     res.json({
  //       message: 'Fail',
  //       error: err
  //     });
  //     return
  //   }

  //   if (user === null) {
  //     res.status(400).json({
  //       message: 'Fail',
  //       error: 'Check your username and password'
  //     });
  //     return
  //   }

  //   res.json({
  //     message: 'Success',
  //     data: user
  //   });
  //   return;
  // });
// });
// router.get('/login', function (req, res, next){
//   res.render('login', {title:'login'})
// })


router.post('/login', function(req, res, next) {
  userController.loginUser(req.body, function(err, user) {
    if (err) {
      res.status(404).json({
        message: 'Fail',
        error: err
      });
      return;
    }

    if (user === null) {
      res.render('result', {
        message: ' Please check your username and password',
        error: 'Check your username and password'
      });
      return;
    }
    res.render('result', {
      message: 'Hello ' + user.name + ", you've successfully logged in",
      data: user
    });
    return;
  });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Please Log In' });
});



module.exports = router;
