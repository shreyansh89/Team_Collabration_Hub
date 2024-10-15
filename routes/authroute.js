const express = require('express');

const routes = express.Router();

const authcontroller = require("../controllers/authcontroller");
const authMiddleware = require("../middleware/auth");

routes.post("/register", authcontroller.register);

routes.post("/login" , authcontroller.login);

routes.put("/role/:userId" , authMiddleware, authcontroller.assignrole);

module.exports = routes;