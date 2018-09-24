const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');

const User = require('../db.js').User;

router.post('/createAccount', (req, res) => {
  console.log('createAccount req.body:', req.body);
  const saltRounds = 10;
  let {username, password, email} = req.body;

  bcrypt.genSalt(saltRounds)
    .then(salt => {
      return bcrypt.hash(password, salt);
    })
    .then(hash => {
      return User.create({
        username,
        password: hash,
        email,
        isCreator,
        lastloggedin: new Date()
      });
    })
    .then(newUser => {
      req.session.username = username;
      newUser = newUser.dataValues;
      console.log('New User inserted:', newUser);
      delete newUser.password;

      res.send({
        loggedIn: true,
        userData: newUser,
      });
    })
    .catch(err => console.log('Account creation error!'));
});

module.exports = router;