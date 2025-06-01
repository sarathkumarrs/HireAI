const express = require('express');
const router = express.Router();
const userController = require('../controllers/user')

router.get('/', (req, res) => {
  res.send('API is working!');
});

router.post("/signup", userController.signupUser)
router.post("/login", userController.loginUser) 

module.exports = router;
