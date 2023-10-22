const jwt = require("jsonwebtoken")
const auth = require("../auth/auth") 
const validations = require("../validations/valid");
const userModel = require("../models/userModel");

const loginUser = async(req, res) => {
    const userInfo = req.body;
    try {
        if(validations.validateLogin(userInfo)) {
            const user = await userModel.findOne({email : userInfo.email});
            if(!user) {
                res.status(404).json({
                    message : "An account with this email does not exist"
                })
            }
            const isPasswordCorrect = auth.comparePassword(userInfo.password, user.password);
            if(isPasswordCorrect) {
                const token = jwt.sign(
                    {id : user._id}, 
                    process.env.jwt_secret_key
                );
                res.status(200).json({
                    token, 
                    user : {
                        id : user._id, 
                        name : user.name, 
                        email : user.email, 
                        date : user.date
                    }
                });
                console.log(user);
            }
            else {
                res.status(401).json({
                    message : "Invalid Credentials"
                })
            }
        }
        else {
            res.status(400).json({ message : validations.errorMessage });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message : error.message });
    }
}

module.exports = {loginUser};