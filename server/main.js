import { createApolloServer } from 'meteor/apollo';

import { schema, resolvers } from '../imports/api/schema';

createApolloServer({
  graphiql: true,
  pretty: true,
  schema,
  resolvers,
});