const userModel = require("../models/userModel");
const valid = require("../validations/valid");
const auth = require("../auth/auth");

const changePassword = async (req, res) => {
    try {
        const userInfo = req.body;

        if (valid.validateChangePasswordForm(userInfo)) {
            const user = await User.findById({ _id: req.user._id });

            const isSamePassword = await auth.comparePassword(userInfo.password, user.password);
            
            if (isSamePassword) {
                res.status(400).json({
                    message: "Choose a new password.",
                });
            } 
            else {
                const hash = await auth.hashPassword(userInfo.password);
                
                await User.findByIdAndUpdate(
                    { _id: req.user._id },
                    { password: hash }
                );

                res.status(200).json({
                    message: "Password has been successfully updated.",
                });
            }
        } else {
            res.status(400).json({ message: valid.errorMessage() });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {changePassword};

