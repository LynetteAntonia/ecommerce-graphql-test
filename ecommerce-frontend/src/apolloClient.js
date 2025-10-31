import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/", // address GraphQL Gateway 
  cache: new InMemoryCache(),
});

export default client;
