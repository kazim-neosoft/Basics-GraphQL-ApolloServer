import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

//types
import { typeDefs } from "./schema.js";
import { resolversFunction } from "./resolverFunction.js";

const resolvers = resolversFunction;
//server setup
const server = new ApolloServer({
  //typedefs -- defination of types of data
  typeDefs,
  //resolvers
  resolvers,
});
const { url } = await startStandaloneServer(server, {
  listen: {
    port: 4000,
  },
});

console.log(`🚀  Server ready at: ${url}`);
