const express = require('express');

const routes = express.Router();

const chatcontroller = require("../controllers/chatcontroller");




routes.get("/:projectId", chatcontroller.gettheChatMessage);


module.exports = routes;