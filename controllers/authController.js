const {User} = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();


//register user
exports.register = async (req, res) => {
    try {
        await User.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
            roles: req.body.roles
        });
        res.send({message: "Korisnik je uspjesno registrovan!"});
    } catch (err) {
        res.status(500).send({message: err.message});
    }
}

//login 
exports.signin = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                email: req.body.email
            }
        });
        if (!user) {
            return res.status(404).send({message: "Korisnik nije pronađen."});
        }
        //checking if password is same
        var isPasswordValid = bcrypt.compareSync(req.body.password, user.password);

        if (!isPasswordValid) {
            return res.status(401).send({accessToken: null, message: "Pogrešna lozinka!"});
        }

        var token = jwt.sign({id: user.id}, process.env.SECRET_KEY, {expiresIn: 86400});

        res.status(200).send({
            id: user.id,
            email: user.email,
            roles: user.roles,
            accessToken: token
        });

    } catch (err) {
        res.status(500).send({message: err.message});
    }
}