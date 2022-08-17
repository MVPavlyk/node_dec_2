const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const config = require('../config/config');
const path = require('path');
const {customError} = require('../errors');
const emailTemplates = require('../email-templates');

module.exports = {
    sendMail: async (userEmail = '', emailAction = '', context = {}) => {
        const transporter = nodemailer.createTransport({
            from: 'DBZ',
            auth: {
                user: config.NO_REPLY_EMAIL,
                pass: config.NO_REPLY_EMAIL_PASSWORD
            },
            service: 'gmail'
        });

        const hbsOptions = {
            viewEngine: {
                extname: '.hbs',
                defaultLayout: 'main',
                layoutsDir: path.join(process.cwd(), 'email-templates', 'layouts'),
                partialsDir: path.join(process.cwd(), 'email-templates', 'partials')
            },
            viewPath: path.join(process.cwd(), 'email-templates', 'views'),
            extName: '.hbs'
        };

        transporter.use('compile', hbs(hbsOptions));

        const templateInfo = emailTemplates[emailAction];

        if (!templateInfo) {
            throw new customError('Wrong email action', 500);
        }

        context.frontendUrl = config.FRONTEND_URL;

        return transporter.sendMail({
            to: userEmail,
            subject: templateInfo.subject,
            template: templateInfo.template,
            context
        });
    }
};