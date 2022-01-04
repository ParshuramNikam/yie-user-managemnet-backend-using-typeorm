const comparePassword = require("../helpers/comparePassword");
const signJwtToken = require("../helpers/signJwtToken");
const db = require("../models/index");
const User = db.users;

module.exports = async (req, res, next) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) return res.status(400).send({ status: "failed", message: "All fileds required!" })

        const user = await User.findOne({
            where: {
                email: email
            }
        })

        console.log("===============");
        console.log(user && user.dataValues);
        console.log("===============");

        if (!user) return res.status(400).send({ status: "failed", message: "User not exists!" })

        const isPasswordValid = await comparePassword(password, user.password);
        console.log(isPasswordValid);

        if (!isPasswordValid) return res.status(400).send({ status: "failed", message: "Invalid credentials" })
        
        res.locals.user = user;

        // sign JWT token for user :
        const token = await signJwtToken(user.id, user.role);
        res.locals.token = token;

        next();

    } catch (error) {
        res.status(400).send({ status: "failed", message: error.message, error });
    }
}