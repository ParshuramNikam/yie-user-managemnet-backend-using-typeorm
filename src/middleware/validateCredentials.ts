
// RFC 5322 Format for email validation
const emailValidationRegex = new RegExp(
    "([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])"
);

// password strngth conditions: 1 capitalal & 1 small letter & 1 symbol & password length>=8
const validatePasswordStrengthRegex = new RegExp(
    '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#.\$%\^&\*])(?=.{8,})'
);

module.exports = (req, res, next) => {

    const { email, password } = req.query;

    console.log("valid email : ", emailValidationRegex.test(email));
    console.log("Password strength : ", validatePasswordStrengthRegex.test(password));

    if (!emailValidationRegex.test(email) || !validatePasswordStrengthRegex.test(password))
        return res.status(400).send({ status: "failed", message: "Credentials are not valid" });

    next();

}