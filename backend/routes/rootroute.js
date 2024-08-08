const rootcontroller = require("../controllers/rootcontroller")

const express = require("express");
const router = express.Router()
router.get('/',rootcontroller)       //agar koi "/" kr rha h toh fir rootcontroller chalega

module.exports = router