const express = require('express')
const userController = require('./../controllers/userController.js')
const authController = require('./../controllers/authController.js')
const router = express.Router()

router.post('/signup', authController.signup)
router.post('/login', authController.login)


router  
    .route('/')   //giving file path 
    .get(userController.getAllUsers)   //
    .post(userController.createUser)
 
router
    .route('/:id') //redirect usercontroller
    .get(userController.getUser)
    .patch(userController.updateUser) // Add authController.protect middleware for authentication
    .delete(userController.deleteUser)

module.exports = router 