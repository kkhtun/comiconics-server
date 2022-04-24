module.exports = ({ UsersService, EmailService, VERIFY_EMAIL }) => ({
    createTemplateUser: UsersService.findOneOrCreateUnverifiedUser,
    sendVerifyEmail: async ({ email }) => {
        const token = await UsersService.generateVerificationToken({ email });
        return await EmailService.sendEmailTo({
            email,
            subject: VERIFY_EMAIL.subject,
            html: VERIFY_EMAIL.text.replace("${token}", token),
        });
    },
    verifyEmailWithToken: async ({ email, token }) => {
        return await UsersService.verifyEmailWithToken({ email, token });
        // generate and send auth token or make the user login again
    },
    login: async ({ email, password }) => {
        return await UsersService.generateJsonWebToken({ email, password });
    },
});
