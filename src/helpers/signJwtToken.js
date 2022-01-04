const jwt = require("jsonwebtoken");

module.exports = (id, role) => {
    const token = jwt.sign({ id: id, role: role }, process.env.SECERT_KEY, {
        expiresIn: '365d'   // will expires after 365 days
    });
    return token;
}