const userModel = require("../models/userModel");

const userProfile = async(req, res) => {
    const userId = req.user;
    try {
        const user = await userModel.findOne({_id :userId});
        res.status(200).json({
            user : {
                name : user.name,
                email : user.email, 
                date : user.date, 
                id : user._id
            }
        })
    } catch (error) {
        res.status(500).json(error.message);
    }
}

module.exports = {userProfile};