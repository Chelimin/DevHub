const User = require('../models/user')
const jwt = require('jsonwebtoken')
const Github = require('../models/githubClass')

function showUser (req, res) {
  const username = req.params.username

  User.find({'github.username': username}, function (err, user) {
    if (err) console.log(err)
    const countLanguage = new Github()
    countLanguage.languages = user.data.languages
    user.data.languages = countLanguage.languagesPercentage()
    res.render('userProfile', {user: user})
  })
}

function indexUsers (req, res) {
  User.find(function (err, users) {
    if (err) console.log(err)
    res.render('users', {users: users})
  })
}

function updateUser (req, res) {
  const username = req.params.username

  User.findOneAndUpdate({'github.username': username}, {workExp: req.body.workExp, education: req.body.education}, {}, function (err, user) {
    if (err) console.log(err)
    res.redirect('/users/' + username)
  })
}

function editUser (req, res) {
  const username = req.params.username

  User.find({'github.username': username}, function (err, user) {
    if (err) console.log(err)
    res.render('userForm', {user: user})
  })
}

function getAuthToken (req, res) {
  const tokenInfo = {
    username: req.user.github.username,
    _id: req.user._id
  }
  const token = jwt.sign(tokenInfo, process.env.JWTSECRET)
  res.render('auth', {token: token})
}

module.exports = {
  showUser: showUser,
  indexUsers: indexUsers,
  updateUser: updateUser,
  editUser: editUser,
  getAuthToken: getAuthToken
}
// GET /local/signup
// function getSignup (req, res) {
//   //    console.log("helo!")
//   res.render('signup', {message: req.flash('errorMessage')})
// }
// POST /local/signup
// function postSignup (req, res) {
//   var signupStrategy = passport.authenticate('local-signup', {
//     successRedirect: '/',
//     failureRedirect: '/signup',
//     failureFlash: true
//   })
//
//   return signupStrategy(req, res)
// }

// GET /local/login
// function getLogin (req, res) {
//   res.render('login', {message: req.flash('errorMessage')})
// }

// POST /local/login
// function postLogin (req, res) {
//   var loginStrategy = passport.authenticate('local-login', {
//     successRedirect: '/',
//     failureRedirect: '/login',
//     failureFlash: true
//   })
//
//   return loginStrategy(req, res)
// }

// Restricted page - OWN PROFILE
// function getUser (req, res) {
//   res.render('user', {message: req.flash('errorMessage')})
// }
