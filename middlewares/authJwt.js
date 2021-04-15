const jwt = require("jsonwebtoken");
const {User, ROLES} = require("../models");
require("dotenv").config;


exports.verifyToken = (req, res, next) => {
    let token = req.headers['x-access-token'];
    if (!token) {
        return res.status(403).send({message: "Ne postoji token."});
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).send({message: "Zabranjen pristup!"});
        }
        req.userId = decoded.id;
        return next();
    })
}

exports.isAdmin = async (req, res, next) => {
    try{
        const user = await User.findByPk(req.userId);
        if (user.roles === ROLES[1]) {
            return next();
        }
        res.status(403).send({message: "Potrebna ADMIN rola!"});
    }catch (err) {
        console.error(err);
    }
}

exports.isUser = async (req, res, next) => {
    try{
        const user = await User.findByPk(req.userId);
        if (user.roles === ROLES[0]) {
            return next();
        }
        res.status(403).send({message: "Potrebna USER rola!"});
    }catch(err) {
        console.error(err);
    }
}


exports.checkDuplicateEmail = async (req, res, next) => {
    const user = await User.findOne({
        where: {
            email: req.body.email
        }
    })
    if (user) {
        res.status(400).send({message: "Greška! Email je vec u upotrebi!"})
        return;
    }
    next();
}

