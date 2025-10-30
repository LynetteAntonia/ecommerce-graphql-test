const { ApolloServer } = require('@apollo/server'); //class utama untuk bikin server GraphQL
const { startStandaloneServer } = require('@apollo/server/standalone'); //GraphQL server yang langsung bisa jalan sendiri tanpa perlu Express. Memperhitungkan scope technical test ini, cukup 1 file index.js saja bisa langsung running
const { readFileSync } = require('fs'); //Node.js method buat baca file schema .graphql
const path = require('path');
const axios = require('axios'); //library HTTP client

const typeDefs = readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8'); //Baca isi file schema.graphql, hasilnya string
const BASE_URL = "http://localhost:4001/products"; 

const resolvers = {
  Query: {
    // Produk spesifik tertentu
    product: async (_, { id }) => {
      const { data } = await axios.get(`${BASE_URL}/${id}`);
      return data;
    },
    // List produk
   products: async (_, { category, name }) => {
    const { data } = await axios.get(PRODUCT_BASE);

    let filtered = data;
    if (category) {
      filtered = filtered.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }
    if (name) {
      filtered = filtered.filter(p => p.name.toLowerCase().includes(name.toLowerCase()));
    }
    return filtered;
},


    // User =
    user: async (_, { id }) => {
      return { id, name: "Jane Doe", email: "janedoe@example.com", orders: [] };
    },
    users: async () => {
      return [
        { id: 1, name: "John Doe", email: "johndoe@example.com", orders: [] },
        { id: 2, name: "James Doe", email: "jamesdoe@example.com", orders: [] }
      ];
    },

    // Order (dummy)
    order: async (_, { id }) => {
      return { id, user: { id: 1, name: "John", email: "johndoe@example.com" }, products: [], totalAmount: 0, status: "pending" };
    },
    orders: async (_, { userId }) => {
      return [
        { id: 1, user: { id: userId, name: "John", email: "johndoe@example.com" }, products: [], totalAmount: 0, status: "pending" }
      ];
    },
  },

  Mutation: {
    // Produk
    createProduct: async (_, input) => {
      const { data } = await axios.post(BASE_URL, input);
      return data;
    },
    updateProduct: async (_, { id, ...patch }) => {
      const current = (await axios.get(`${BASE_URL}/${id}`)).data;
      const { data } = await axios.put(`${BASE_URL}/${id}`, { ...current, ...patch }); 
    },
    deleteProduct: async (_, { id }) => {
      await axios.delete(`${BASE_URL}/${id}`);
      return true;
    },

    // User (dummy)
    createUser: async (_, { name, email }) => {
      return { id: Date.now(), name, email, orders: [] };
    },

    // Order (dummy)
    createOrder: async (_, { userId, productIds }) => {
      return {
        id: Date.now(),
        user: { id: userId, name: "John", email: "johndoe@example.com" },
        products: productIds.map(pid => ({ id: pid, name: "Dummy Product", price: 0, stock: 0 })),
        totalAmount: 0,
        status: "pending"
      };
    },
  },
};

async function start() {
  const server = new ApolloServer({ typeDefs, resolvers });
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  console.log(`Running at ${url}`);
}

start();
