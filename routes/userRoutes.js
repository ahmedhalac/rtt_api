const controller = require("../controllers/authController");
var express = require("express");
const authJwt = require("../middlewares/authJwt");
var router = express.Router();


router.get("/admin", authJwt.verifyToken, authJwt.isAdmin, (req,res) => {
    res.send("ADMIN PAGE");
});

router.get("/user", authJwt.verifyToken, authJwt.isUser, (req,res) => {
    return res.send("USER PAGE");
});

module.exports = router;