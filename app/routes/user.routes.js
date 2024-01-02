
import express from "express";
import { tokenValidation } from "../config/auth.js";
const router = express.Router()
const { createUser, loginUser ,userList, userSearch} = require("../controllers/user.controller.js");

router.post("/signup", createUser);
router.post("/login", loginUser);
router.get("/searh",tokenValidation,userSearch)
router.get("/list",tokenValidation,userList)
module.exports = router;