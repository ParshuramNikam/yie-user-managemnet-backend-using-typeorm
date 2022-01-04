const db = require("../models/index");
const User = db.users;
const Op = db.Sequelize.Op;
const jwt = require('jsonwebtoken');


module.exports = async (req, res, next) => {
    try {
        // let userJwtToken;
        const userJwtToken = req.cookies.yie_access_token || req.headers["x-access-token"] || (req.headers['authorization'] && req.headers['authorization'].split(' ')[1]) || (req.body && req.body.accessToken);

        console.log(userJwtToken);

        if (!userJwtToken || userJwtToken.length == 0) {
            res.locals.info = {
                status: "failed",
                message: "JWT token not found!"
            }
            return next();
        }

        const userDetails = jwt.verify(userJwtToken, process.env.SECERT_KEY);

        const user = await User.findOne({
            where: {
                id: userDetails.id
            }
        })

        if (!user) {
            res.locals.info = {
                status: "failed",
                message: "User not found"
            }
        } else {
            res.locals.info = {
                status: "success",
                user: user.dataValues
            }
        }

        next();

    } catch (error) {
        console.log(error);
        res.status(400).send({ status: "failed", message: error.message, error });
    }
}