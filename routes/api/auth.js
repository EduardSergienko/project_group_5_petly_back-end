const express = require("express");
const router = express.Router();
const { asyncWrapper } = require("../../helpers/api-helpers");
const { register } = require("../../controllers/auth-controller");

const validateBody = require("../../middlewares/validateBody");
const { userSchema } = require("../../db/user");

router.post("/register", validateBody(userSchema), asyncWrapper(register));
module.exports = router;
