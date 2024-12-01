const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/userModel');
const router = express.Router();
const bcrypt = require('bcrypt');

router.post('/register', async (req, res) => {
    try {
        //checking if already exists
        const userExists = await User.findOne({ email: req.body.email })
        if (userExists) {
            res.send({
                success: false,
                message: "user already exists",
            });
        }

        //hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password,salt);
        req.body.password = hashedPassword;

        //creating user
        const newUser = await User(req.body);
        await newUser.save();
        res.send({
            success: true,
            message: "user registered successfully!"
        })
    }
    catch (error) {
        console.log(error)
    }

})

router.post('/login',async(req,res) => {
    try {
        const user = await User.findOne({email : req.body.email});
        if(!user){
            res.send({
                success : false,
                message : "user does not exists"
            });
        }
        const validPassword = await bcrypt.compare(req.body.password,user.password);
        if(!validPassword){
            res.send({
                success : false,
                message : "invalid password"
            });
        }

        res.send({
            success : true,
            message : "succuessfully logined"
        })
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;