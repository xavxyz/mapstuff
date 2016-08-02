import { createApolloServer } from 'meteor/apollo';

import { schema, resolvers } from '../imports/api/schema';
import Instagram from '../imports/api/instagram/connector.js';

createApolloServer({
  graphiql: true,
  pretty: true,
  schema,
  resolvers,
});