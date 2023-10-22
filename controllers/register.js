const userModel = require("../models/userModel");

const auth = require("../auth/auth")
const validations = require("../validations/valid");



const registerUser = async(req, res) => {
    const user = req.body;
    try {
        const response = await validations.validateRegistration(user);
        if(response) {
            const hash = await auth.hashPassword(user.password);
            const {name, email} = user;
            const newUser = new userModel({
                name : name, 
                email : email,
                password : hash
            });
            const savedUser = await newUser.save();
            res.status(201).json(savedUser);
            console.log(savedUser);
        }
        else {

            res.status(400).json({message : validations.errorMessage});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message : validations.errorMessage});
    }
}

module.exports = { registerUser };