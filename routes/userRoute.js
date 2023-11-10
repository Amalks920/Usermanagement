const express=require('express');
const router=express();
const { signUp, loginSignUp } = require('../controller/authCtrl');
const { signUpValidation,loginValidation } = require('../helper/validateHelper');


router.post('/signup',signUpValidation, signUp);
router.post('/login',loginValidation,loginSignUp);

module.exports=router