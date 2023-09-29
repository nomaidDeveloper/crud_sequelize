
import express from "express";
const router = express.Router()
const { createUser, loginUser } = require("../controllers/user.controller.js");

router.post("/signup", createUser);
router.post("/login", loginUser);

module.exports = router;