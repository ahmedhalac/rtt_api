const controller = require("../controllers/authController");
const authJwt = require("../middlewares/authJwt");
var express = require("express");
var router = express.Router();

/*
router.use((req, res, next) => {
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
})*/
router.post("/register", authJwt.checkDuplicateEmail, controller.register);

router.post("/login", controller.signin);



module.exports = router;