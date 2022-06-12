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
        const user = await UsersService.verifyEmailWithToken({ email, token });
        // generate and send auth token or make the user login again
        return await UsersService.generateJsonWebToken(user._id);
    },
    login: async ({ email, password }) => {
        const user = await UsersService.checkUserPassword({ email, password });
        return await UsersService.generateJsonWebToken(user._id);
    },
});
