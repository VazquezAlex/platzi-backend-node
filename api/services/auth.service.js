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

    async sendMail(email) {

        // We try to get the user with this email.
        const user = await service.findByEmail(email);
        // If no user is found, we return an error.
        if (!user) throw boom.unauthorized();

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
        const info = await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: `${ user.email }`,
            subject: "Hello ✔",
            text: "Hello world?",
            html: "<b>Hello world?</b>",
        });

        if (!info) throw boom.unauthorized();

        return { message: 'mail sent' };

    }

}

module.exports = AuthService;
