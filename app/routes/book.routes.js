

import express from "express";
const router = express.Router()
const { create } = require("../controllers/book.controller.js");

router.post("/create", create);


module.exports = router;