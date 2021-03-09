const express = require("express");
const controller = require("../controllers");
const routes = express.Router();

routes.route("/").get(controller.getSongs);
routes.route("/new").post(controller.addSong);

module.exports = routes;