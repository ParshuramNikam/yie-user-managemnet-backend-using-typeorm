
// password strngth conditions: 
// =>   1 capitalal 
// =>   1 small letter 
// =>   1 symbol 
// =>   password length > 8

const validatePasswordStrengthRegex = new RegExp(
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9_])'
);

const passwordValidator = (password) => {
    return validatePasswordStrengthRegex.test(password);
}

module.exports = passwordValidator;