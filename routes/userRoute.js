const express = require("express");

const loginController = require("../controllers/login");
const profileController = require("../controllers/profile");
const registerController = require("../controllers/register");
const tokenController = require("../controllers/validToken");
const auth = require("../auth/auth");


const user_route = express();

user_route.get("/login");
user_route.post("/login", loginController.loginUser);

user_route.get("/register");
user_route.post("/register", registerController.registerUser);

user_route.post("/tokenValid", auth.authorizedRoutes, tokenController.validToken);

user_route.get("/profile", auth.authorizedRoutes, profileController.userProfile);

module.exports = {user_route};