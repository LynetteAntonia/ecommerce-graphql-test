import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_PRODUCT } from "../graphql/mutations";
import { GET_PRODUCTS } from "../graphql/queries";

export default function AddProduct() {
  const [form, setForm] = useState({ name: "", price: "", stock: "" });
  const [createProduct] = useMutation(CREATE_PRODUCT, {
    refetchQueries: [{ query: GET_PRODUCTS }], // supaya list update otomatis
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct({
      variables: {
        name: form.name,
        price: parseFloat(form.price),
        stock: parseInt(form.stock),
      },
    });
    setForm({ name: "", price: "", stock: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      /> <br></br>
      <input
        placeholder="Price"
        type="number"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
      /><br></br>
      <input
        placeholder="Stock"
        type="number"
        value={form.stock}
        onChange={(e) => setForm({ ...form, stock: e.target.value })}
      /> <br></br>
      <button type="submit">Add Product</button>
    </form>
  );
}
