const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const validToken = async(req, res) => {
    try {
        const userToken = req.header("Autherization").split("Bearer")[1];
        if(!userToken) {
            return res.status(403).json(false);
        }
        const verifyToken = jwt.verify(userToken, process.env.jwt_secret_key);
        if(!verifyToken) res.status(401).json(false);
        const user = userModel.findOne({_id : verifyToken.id});
        if(!user) {
            res.status(404).json(false);
        }
        return res.status(200).json(true);
    } catch (error) {
        res.status(500).json({error : error.message});
    }
}

module.exports = {validToken};