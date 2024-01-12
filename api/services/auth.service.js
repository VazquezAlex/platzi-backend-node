// Third-party imports.
const bcrypt = require('bcrypt');
const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

// Local imports.
const UserService = require('./user.service');

// Variable creation.
const service = new UserService();

class AuthService {

    constructor() {}

    async getUser(email, password) {

        // We try to get the user with this email.
        const user = await service.findByEmail(email);

        // If no user is found, we return an error.
        if (!user) throw boom.unauthorized();

        const passwordMatches = await bcrypt.compare(password, user.password);

        // If user password don't match the registered one, we send an error.
        if (!passwordMatches) throw boom.unauthorized();

        // Delete the password from the response.
        delete user.dataValues.password;

        return user;
    }

    signToken(user) {
         // Prepare payload for token.
         const payload = {
            sub: user.id,
            role: user.role,
        }

        // Generate and return token.
        return jwt.sign(payload, process.env.JWT_SECRET);
    }

    async sendRecovery(email) {
        // We try to get the user with this email.
        const user = await service.findByEmail(email);
        // If no user is found, we return an error.
        if (!user) throw boom.unauthorized();

        const payload = { sub: user.id }
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '15min' });
        const link = `http://myfrontend.com/recover-password/?token=${ token }`;

        // We save on the DB the generate token, to validate it later on.
        await service.update(user.id, {
            recoveryToken: token,
        });

        const mail = {
            from: process.env.SMTP_USER,
            to: `${ user.email }`,
            subject: "Email para recuperar contraseña",
            html: `<b>Ingresa a este link para recuperar la contraseña 👉🏻 ${ link }</b>`,
        }

        return await this.sendMail(mail);
    }

    async changePassword(token, newPassword) {
        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            const user = await service.findOne(payload.sub);

            if (!user) throw boom.unauthorized();
            if (user.recoveryToken !== token) throw boom.unauthorized();

            // We encrypt the new password.
            const hashedPassword = await bcrypt.hash(newPassword, 10);

            // We update the password and reset the recovery token to null.
            await service.update(user.id, {
                recoveryToken: null,
                password: hashedPassword
            });

            return { message: 'Password Changed' }
        } catch (e) {
            throw boom.unauthorized();
        }
    }

    async sendMail(infoMail) {

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            secure: true,
            port: process.env.SMTP_PORT,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            },
        });

        // send mail with defined transport object
        const info = await transporter.sendMail(infoMail);

        if (!info) throw boom.unauthorized();

        return { message: 'mail sent' };
    }

}

module.exports = AuthService;
