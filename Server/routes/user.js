const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const user = require('../models/user');
const User = require('../models/user');
/**
 * user registration
 */
router.post("/",[
    check("name","user name is required").not().isEmpty(),
    check("email","user email is required").not().isEmpty(),
    check("password","user password is required").not().isEmpty(),
    check("role","user role is required").not().isEmpty(),
],
function(req,res){
    const errors = validationResult(req);
    console.log("reqBody", req.body)
    if(!errors.isEmpty()){
        console.log(errors);
        return res.status(404).jsop({message:"data couldn't be processed"})
    }else{
        User.find({email:req.body.email}).then(result =>{
            if(result.length > 0){
                res.status(404).json({message:"user record alerdy exists"})
            }else{
                User.create(req.body).then(newuser =>{
                    console.log("new user created..")
                    res.status(201).json({
                        message: "New User created",
                        userid:newuser.userId,
                        Name: newuser.name
                    })
                }).catch(err=>{
                    console.log(err.message)
                    res.status(400).json(err.message)
                })
            }
        }).catch(err=>{
            console.log(err.message)
            res.status(400).json(err.message)
        })
    }
})

/**
 * Login service 
 */
router.post("/login",[
    check("email", "email is required").not().isEmpty().isEmail(),
    check("password","password id required").not().isEmpty()
], (req,res)=>{
    const errors = validationResult(req);
    console.log("reqBody", req.body)
    if(!errors.isEmpty()){
        console.log(errors);
        return res.status(404).jsop({message:"data couldn't be processed"})
    }else{
        user.findOne({email:req.body.email}, function(err, result){
            const parent = null;
            
            if(err){
                console.log(err.message)
                res.status(400).json(err.message)
            }
                if(result == null){
                    res.status(401).json({message:"wrong email id"})
                }else{
                    result.comparePassword(req.body.password, function(err, isMatch){
                        if(isMatch){
                            resData = JSON.parse(JSON.stringify(result));
                            res.status(200).json({
                                message:"Login successfully",
                                userId:result.userId,
                                user:result.name
                            })
                        }else{
                            res.status(400).json({message:"Wrong password"})
                        }
                    })
                }           
        })
    }
})

/**
 * Logout service 
 */
router.post("/logout",[
    check("email", "email is required").not().isEmpty().isEmail(),
    check("password","password id required").not().isEmpty()
], (req,res)=>{
    const errors = validationResult(req);
    console.log("reqBody", req.body)
    if(!errors.isEmpty()){
        console.log(errors);
        return res.status(404).jsop({message:"data couldn't be processed"})
    }else{
        user.findOne({email:req.body.email}).then(result=>{
            console.log(result)
            res.status(200).json({message:"Logout successfully"})
        }).catch(err=>{
            console.log(err.message)
            res.status(400).json({message:"coould not logout"})
        })
    }
})

module.exports = router;