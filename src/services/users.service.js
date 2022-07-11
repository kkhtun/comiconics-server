module.exports = ({ UsersModel, USER_ERRORS }) => ({
    getOneUserByFilter: async (query) => {
        const user = await UsersModel.findOne(query).lean().exec();
        if (!user) throw new Error(USER_ERRORS.NOT_FOUND);
        return user;
    },
});
