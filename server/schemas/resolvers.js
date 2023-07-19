const User = require('../models/User');

const resolvers = {
    Query: {
        user: async (parent, { _id, username }) => {

            const params = id ? { _id } : { username };

            const foundUser = await User.findOne({params});

            if (!foundUser) {
                throw new Error('Cannot find a user with this id!');
            }

            return foundUser;
        }
    },
    Mutation: {
        createUser: async (parent, { username, email, password }) => {

            const user = await User.create({ username, email, password });
            const token = signToken(user);

            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('No user found with this email address');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);

            return { token, user };
        },
        saveBook: async(parent, args, context) => {
            if (context.user) {
                const { user } = context;
                const { bookId } = args;

                try {
                    return await User.findOneAndUpdate(
                        { _id: user._id },
                        { $addToSet: { savedBooks: bookId } },
                        { new: true, runValidators: true }
                    );
                } catch (err) {
                    throw new Error(err);
                }
            }
            throw new Error('Authentication required to save a book.');
        },
        deleteBook: async (parent, args, context) => {
            if (context.user) {
                const { user } = context;
                const { bookId } = args;

                const updatedUser = await User.findOneAndUpdate(
                    { _id: user._id },
                    { $pull: { savedBooks: bookId } },
                    { new: true }
                );

                if (!updatedUser) {
                    throw new AuthenticationError("Couldn't find user with this id!");
                }

                return updatedUser;
            }
            throw new Error('Authentication required to save a book.');
        }
    }
}

module.exports = resolvers;