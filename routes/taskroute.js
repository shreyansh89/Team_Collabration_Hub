const express = require('express');

const routes = express.Router();

const authMiddleware = require("../middleware/auth");

const taskcontroller = require("../controllers/taskcontroller");




routes.post("/create",authMiddleware, taskcontroller.createTask);

routes.get("/view",authMiddleware, taskcontroller.getTask);

routes.delete("/delete/:id",authMiddleware, taskcontroller.deletetask);

routes.put("/update/:id",authMiddleware, taskcontroller.updateTask);



module.exports = routes;