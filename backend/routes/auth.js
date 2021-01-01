const express = require('express')
const router = express.Router()
const { signUp, signIn, signOut, requireSignin } = require('../controllers/auth.js')

// validator
const { runValidation } = require('../validators')
const { userSignupValidator, userSigninValidator } = require('../validators/auth')



router.post('/signup', userSignupValidator, runValidation, signUp)
router.post('/signin', userSigninValidator, runValidation, signIn)
router.get('/signout', signOut)

//test

router.get('/secret', requireSignin, (req, res) => {
    res.json({
        message: 'You have access to secret page'
    })
})

module.exports = router