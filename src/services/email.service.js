const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "8a7365a3ad26b2",
        pass: "b54c771ab241cf",
    },
});

module.exports = ({}) => ({
    sendEmailTo: async ({ email, subject, html }) => {
        const mailOptions = {
            from: process.env.ADMIN_GMAIL,
            to: email,
            subject,
            html,
        };

        return await transporter.sendMail(mailOptions);
    },
});
