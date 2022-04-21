module.exports = ({ UsersService, EmailService }) => ({
    sendRegistryEmail: async ({ email }) => {
        return await EmailService.sendEmailTo({
            email,
            subject: "Webcomics Registration",
            text: "Some email from webcomics",
        });
    },
});
