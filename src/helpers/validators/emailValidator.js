
// RFC 5322 Format for email validation
const emailValidationRegex = new RegExp(
    "([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])"
);

const emailValidator = (email) => {
    return emailValidationRegex.test(email);
}

module.exports = emailValidator;