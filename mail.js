var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "changemymind1999@gmail.com",
        pass: "hypertension",
    },
});

var mailOptions = {
    from: "changemymind1999@gmail.com",
    to: "khaingkhanthtun@gmail.com",
    subject: "Sending Email using Node.js",
    text: "That was easy!",
};

transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
        console.log(error);
    } else {
        console.log("Email sent: " + info.response);
    }
});
