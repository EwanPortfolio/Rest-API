const User = require("../models/users");
const jwt = require("jsonwebtoken");

async function registerUser (req, res) {
    try {
        console.log(req.body);
        await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });
            const expirationTime = 1000*60*60*24*7
            const privateKey = process.env.JWTPASSWORD
            const payload = {
                username: req.body.username,
            }
            const options = {
                expiresIn: expirationTime
            }
            const token = await jwt.sign(payload,privateKey,options)
            console.log(token)


        res.status(201).json({
            message: "User Registered in the database",
            user: {
                username: req.body.username,
                email: req.body.email,
                token: token
            }
        })
    } catch (error) {
        console.log(error);
        res.status(501).json({
            message: error.message,
            detail: error
        })
    }
};

async function listAllUsers (req,res) {
    try{
        const listOfUser = await User.findAll();
        res.status(200).json({
            message: "All users from the datebase are",
            userlist: listOfUser
        });
    } catch (error) {
        console.log(error);
        res.status(501).json({
            message: error.message,
            detail: error
        })
    }
}

 async function loginUser (req, res) {
     try {
            const expirationTime = 1000*60*60*24*7
            const privateKey = process.env.JWTPASSWORD
            const payload = {
                username: req.body.username,
                email: req.body.email
                
            };
            const options = {
                expiresIn: expirationTime
            };
            const token = await jwt.sign(payload, privateKey, options)
        
        res.status(201).json({

            message: "success new token",
            user: {
                username: req.body.username,
                email: req.body.email
            },

            token: token

        });    
    } catch (error) {
             console.log(error);
         res.status(501).json({
            message: error.message,
            detail: error
         })
     }
 }

module.exports = {registerUser, listAllUsers,loginUser}