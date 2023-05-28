const express = require("express");

const planetsController= require("./planets.controller");

const router= express.Router();

router.get("/planets",planetsController.getAllPlanets);

module.exports= router;


