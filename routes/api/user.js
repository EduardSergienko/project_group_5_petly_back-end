const express = require("express");
const { authenticate } = require("../../middlewares/auth-middleware");
const { asyncWrapper } = require("../../helpers/api-helpers");
const ctrl = require("../../controllers/user-controller");

const router = express.Router();

router.get("/", authenticate, asyncWrapper(ctrl.usersPersonalInfoController));

module.exports = router;
