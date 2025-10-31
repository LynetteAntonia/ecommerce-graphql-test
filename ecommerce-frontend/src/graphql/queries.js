// menyimpan GraphQL query yang dipakai di frontend

import { gql } from "@apollo/client";

// Query semua produk
export const GET_PRODUCTS = gql`
  query GetProducts($category: String, $name: String) {
    products(category: $category, name: $name) {
      id
      name
      description
      price
      stock
    }
  }
`;

// Query satu produk by id
export const GET_PRODUCT_BY_ID = gql`
  query GetProductById($id: ID!) {
    product(id: $id) {
      id
      name
      description
      price
      stock
    }
  }
`;
