const User = require('../models/User');

const resolvers = {
    Query: {
        users: async () => {
            return User.find({});
        }
    }
}

module.exports = resolvers;