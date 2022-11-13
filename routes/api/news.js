const express = require("express");
const router = express.Router();
const getNewsController = require("../../controllers/news-controller");

router.get("/", getNewsController);

module.exports = router;
