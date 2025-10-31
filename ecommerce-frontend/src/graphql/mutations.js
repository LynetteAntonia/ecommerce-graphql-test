import { gql } from "@apollo/client";

export const CREATE_PRODUCT = gql`
  mutation CreateProduct($name: String!, $price: Float!, $stock: Int!, $description: String, $category: String) {
    createProduct(name: $name, price: $price, stock: $stock, description: $description, category: $category) {
      id
      name
      price
      stock
      description
      category
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(id: $id)
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct(
    $id: ID!
    $name: String
    $price: Float
    $stock: Int
    $description: String
    $category: String
  ) {
    updateProduct(
      id: $id
      name: $name
      price: $price
      stock: $stock
      description: $description
      category: $category
    ) {
      id
      name
      price
      stock
      description
      category
    }
  }
`;
