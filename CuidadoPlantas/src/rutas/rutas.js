const router=require('express').Router();
const express=require('express');
const userControllers = require('./../controllers/controllers');
router.use(express.json());
router.put('/login',userControllers.login);





module.exports=router;