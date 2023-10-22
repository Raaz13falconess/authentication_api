const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { errorMessage } = require("../validations/valid");

const hashPassword = async(password) => {
   try {
        const saltRounds = 10;
        hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
   } catch (error) {
        console.log(error);

   }
}

const comparePassword = async(password, userPassword) => {
    const result = await bcrypt.compare(password, userPassword);

    return result;
}

const authorizedRoutes = async(req, res, next) => {
    try {
        let userToken;
        console.log("Authorization header : ",  req.header("Authorization"));
        if(req.header("Authorization")) {
            userToken = req.header("Authorization").replace("Bearer ", "");
        }
        console.log("userToken : ", userToken);
        if(userToken) {
            try {
                const verifyToken = jwt.verify(
                    userToken,
                    process.env.jwt_secret_key
                );
                console.log("verifyToken :", verifyToken);
                const user = await userModel.findOne({_id : verifyToken.id});
                console.log("user: ", user);
                if(user) {
                    req.user = user.id;
                    next();
                }
                else {
                    return res.status(403).json({
                        message : "There is no current user attached to this token"
                    });
                }
            } catch (error) {
                console.log(error);
                res.status(401).json({
                    message : "Invalid or expired token"
                });
            }
        }
        else {
            res.status(401).json({
                message : "You are not authorized to see this route"
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error : error.message});
    }
};

module.exports = {hashPassword, comparePassword, authorizedRoutes};