const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.ADMIN_GMAIL,
        pass: process.env.ADMIN_GMAIL_PASSWORD,
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
