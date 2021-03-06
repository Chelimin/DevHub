const express = require('express')
const router = express.Router()
const usersController = require('../../controllers/usersController')

function authenticatedUser (req, res, next) {
  if (req.isAuthenticated()) return next()

  req.flash('errorMessage', 'Login to view your profile')
  res.redirect('/login')
}

router.route('/')
  .get(usersController.indexUsers)

router.route('/authtoken')
  .get(authenticatedUser, usersController.getAuthToken)

router.route('/:username')
  .get(usersController.showUser)
  .put(authenticatedUser, usersController.updateUser)

router.route('/:username/edit')
  .get(authenticatedUser, usersController.editUser)
  .post(usersController.updateUser)
// router.route('/USERS/:ID') to edit own profile => see usersController
//   .get(authenticatedUser, usersController.getUser)

module.exports = router
