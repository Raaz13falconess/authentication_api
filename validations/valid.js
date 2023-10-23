const userModel = require("../models/userModel");

let message = "";
const errorMessage = async() => {
    return message;
}

const strongPassword = async(password) => {
    const passwordCriteria = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%&^*])(?=.{8,})/;
    let isValid = passwordCriteria.test(password);
    if(isValid) {
        return true;
    }
    else {
        return false;
    }
}

const validateRegistration = async(formInfo) => {
    // const {name, email, password, confirmPassword} = formInfo;
    const name = formInfo.name;
    const email = formInfo.email;
    const password = formInfo.password;
    const confirmPassword = formInfo.confirmPassword
    if(!name || !email || !password || !confirmPassword) {
        message = "All fields are required";
        console.log(formInfo);
        console.log(message);
        return false;
    }
    const isEmailRegistered = await userModel.findOne({email : email});
    if(isEmailRegistered) {
        message = "An account with this email already exists";
        console.log(message);
        return false;
    }
    const isPasswordValid = strongPassword(password);
    if(isPasswordValid) {
        if(password != confirmPassword) {
            message = "Passwords Do not match";
            console.log(message);
            return false;
        }
    }
    else {
        message = "Choose a strong password";
        console.log(message);
        return false;

    }
    return true;
}

const validateLogin = async(loginInfo) => {
    const {email, password} = loginInfo;
    if(!email || !password) {
        message = "All fields are required";
        return false;
    }
    return true;
}

const validateChangePasswordForm = (formInfo) => {
    const { password, confirmPassword} = formInfo;
    if(!password || !confirmPassword) {
        message = "All fields are required";
        return false;
    }

    const isPasswordValid = strongPassword(password);
    if(isPasswordValid) {
        if(password != confirmPassword) {
            message = "Passwords don't match";
            return false;
        }
    }
    else {
        message = "Choose a strong password";
        return false;
    }
    return true;
}

module.exports = {validateRegistration, validateLogin, errorMessage, validateChangePasswordForm};

