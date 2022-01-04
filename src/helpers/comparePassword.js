
const bcrypt = require('bcrypt');

// compare becryotHashed passoword and user password

module.exports = async (password, passwordHash) => {
    const isbothSame = await bcrypt.compare(password, passwordHash);
    return isbothSame;
}