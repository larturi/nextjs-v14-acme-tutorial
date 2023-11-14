const bcrypt = require('bcrypt');

async function hashPassword (password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
}


hashPassword('tu-password-aqui$').then((hashedPassword) => {
    console.log(hashedPassword);
}).catch((error) => {
    console.error(error);
});

// To run >> node scripts/password-generator-test.js