const { AuthenticationError } = require('apollo-server-express');
const User = require('../models/User');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return User.find();
        },
        user: async (parent, { _id, username }) => {

            const params = _id ? { _id } : { username };

            const foundUser = await User.findOne({params});

            if (!foundUser) {
                throw new Error('Cannot find a user with this id!');
            }

            return foundUser;
        },
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id });
            }
            throw new AuthenticationError('You need to be logged in!');
        }
    },
    Mutation: {
        createUser: async (parent, { username, email, password }) => {

            const user = await User.create({ username, email, password });
            const token = signToken(user);

            return { token, user };
        },
        loginUser: async (parent, { email, password }) => {
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
                const { bookData } = args;

                try {
                    return await User.findOneAndUpdate(
                        { _id: user._id },
                        { $addToSet: { savedBooks: bookData } },
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