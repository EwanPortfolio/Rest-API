const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")



async function hashPassword(req, res, next) {
    try {
        const saltRounds = parseInt(process.env.SALT)
        const plainTextPassword = req.body.password;
        const hashedPassword = await bcrypt.hash(plainTextPassword,saltRounds)
        req.body.password = hashedPassword;
        next();
    } catch (error) {
        console.log(error);
        res.status(501).json({
            message: error.message,
            error: error
        })
    }
};
 
async function passwordCheck(req, res, next) {
    try {
        const userDetails = await User.findOne({where: {username: req.body.username}})
        console.log(userDetails);
            if(userDetails !== null){
                var hashedPassword = userDetails.password;
            } else {
                var hashedPassword = "Dummy"
            }
            const plainTextPassword = req.body.password;
            const match = await bcrypt.compare(plainTextPassword,hashedPassword);
       
        if (match && userDetails) {
            console.log("password & username match");
            next()
            } else {
                throw new Error("Password and username do not match");
            };
        }
    catch (error) {
        console.log(error);
        res.status(501).json({
            message: error.message,
            error: error
        });
    }
}
 


async function deleteUser(req, res, next) {
    try {
        const userDetails = await User.findOne({ where: { username: req.body.username } });

        if (userDetails !== null) {
            const hashedPassword = userDetails.password;
            const plainTextPassword = req.body.password;
            const match = await bcrypt.compare(plainTextPassword, hashedPassword);

            if (match) {
                const deletedUser = await User.destroy({ where:{ username: req.body.username, plainTextPassword: req.body.password }});

                if (deletedUser > 0) {
                    res.status(200).json({ message: "User deleted successfully" });
                } else {
                    res.status(404).json({ message: "User not found or not deleted" });
                }
            } else {
                res.status(401).json({ message: "Authentication failed: Passwords do not match" });
            }
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
            error: error
        });
    }
}



async function updatePassword(req, res, next) {
    try {
        const saltRounds = parseInt(process.env.SALT)
        const plainTextPassword = req.body.newpassword;
        const hashedPassword = await bcrypt.hash(plainTextPassword,saltRounds)
        const update = await User.update({ password: hashedPassword },
            {  where : {username : req.body.username} 

            })   
            res.status(200).send({
                message: "successfully change password"
            })

            } 
            catch (error) {
                console.log(error);
                res.status(500).json({
                    message: "Internal server error",
                    error: error
                });
    }
}

async function tokenCheck(req, res, next) {
     try {
        const secretKey = process.env.JWTPASSWORD
        const token = req.header("Authorization").replace("Bearer ","");
       const decodedToken = jwt.verify(token,secretKey)
       const username = decodedToken.username
       const user = await User.findOne({
          where: {
               username: username
           }
        })
        if (!user) {
            throw new Error ("user no longer in the datebass")
        } else {
            req.user = user;
            next();
         }
     } catch (error) {
        console.log(error);
                res.status(500).json({
                    message: "Internal server error",
                    error: error
                });
     }

 }

module.exports = {
    hashPassword,
    passwordCheck,
    deleteUser,
    updatePassword,
    tokenCheck
};