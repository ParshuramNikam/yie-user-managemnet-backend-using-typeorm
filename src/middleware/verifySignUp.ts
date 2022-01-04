import UserRoles from "../Data/UserRoles";


const emailValidator = require("../helpers/validators/emailValidator");
const encryptPassword = require("../helpers/encryptPassword");

const db = require("../models/index");
const passwordValidator = require("../helpers/validators/passwordValidator");
const contactNoValidator = require("../helpers/validators/contactNoValidator");
const User = db.users;

const verifySignUp = async (req, res, next) => {
    try {
        console.log(req.body);
        let { role, username, email, password, schoolId, age, address, contactNo, parentName, className } = req.body;

        // make zero'th index letter to lowercase
        role = role.charAt(0).toLocaleLowerCase() + role.slice(1);

        // sanitize: convert email to lowercase
        email = email.toLocaleLowerCase();

        if (UserRoles.indexOf(role) === -1)
            return res.status(400).send({ status: "failed", message: "Not valid role" });

        // Required for all users
        if (!role || !username || !email || !password)
            return res.status(400).json({ status: "failed", message: "All fields required!!!!" })

        // check for email validation 
        if (!emailValidator(email)) return res.status(400).send({ status: "failed", message: "Email is not valid!" })

        // check for password strength
        if (!passwordValidator(password)) return res.status(400).send({ status: "failed", message: "Password is not matching all the conditions!" });


        // check username and email existance
        const isUsernamePresent = await User.findOne({ where: { username: req.body.username } })
        const isEmailPresent = await User.findOne({ where: { email } })

        if (isUsernamePresent) return res.status(400).send({ status: "failed", message: "Failed! Username is already in use!"/* , user: user.dataValues  */ });
        if (isEmailPresent) return res.status(400).send({ status: "failed", message: "Failed! Email is already in use!"/* , user: user.dataValues  */ });


        // check for contact no validation
        if (contactNo && !contactNoValidator(contactNo)) return res.status(400).send({ status: "failed", message: "Please enter valid conatct no.! ( ex: 9456875123 )" })


        if (role == 'student' || role == 'teacher' || role == 'schoolAdmin') {
            // check for student, teacher, schoolAdmin
            if (!schoolId || !contactNo || !age || !address) {
                return res.status(400).json({ status: "failed", message: "all fields required!" })
            }

            if (role == 'student') { // check for only student
                if (!parentName || !className) return res.status(400).send({ status: "failed", message: "Parent/ className name is required!" })
            } else {
                parentName = null;
                className = null;
            }
        } else if (role == 'superAdmin') {
            parentName = null;
            schoolId = null;
            className = null;
        }

        res.locals.newUser = {
            role, username, email, schoolId, age, address, contactNo, parentName, className,
            password: encryptPassword(password)
        }

        // jwt token signed in addUser controller
        next();

    } catch (error) {
        console.log(error);
        res.status(400).send({ status: "failed", message: error.message, error });
    }

}

module.exports = verifySignUp;