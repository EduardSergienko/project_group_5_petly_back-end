const express = require("express");
const router = express.Router();
const { asyncWrapper } = require("../../helpers/api-helpers");
const { register } = require("../../controllers/auth-controller");

const validateBody = require("../../middlewares/validateBody");
const { registerSchema } = require("../../helpers/joi-validation");

router.post("/register", validateBody(registerSchema), asyncWrapper(register));
module.exports = router;
