const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.ADMIN_GMAIL,
        pass: process.env.ADMIN_GMAIL_PASSWORD,
    },
});

module.exports = ({}) => ({
    sendEmailTo: async ({ email, subject, text }) => {
        const mailOptions = {
            from: process.env.ADMIN_GMAIL,
            to: email,
            subject,
            text,
        };

        return await transporter.sendMail(mailOptions);
    },
});
