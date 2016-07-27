import { Random } from 'meteor/random';

export const schema = [`
type Email {
  address: String
  verified: Boolean
}
type User {
  emails: [Email]
  username: String
  randomString: String
}
type Query {
  user(id: String!): User
}
schema {
  query: Query
}
`];

export const resolvers = {
  Query: {
    async user(root, args, context) {
      // Only return the current user, for security
      if (context.userId === args.id) {
        return await Meteor.users.findOne(context.userId);
      }
    },
  },
  User: {
    emails: ({emails}) => emails,
    randomString: () => Random.id(),
  }
}
