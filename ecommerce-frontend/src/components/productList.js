import { useQuery, useMutation } from "@apollo/client";
import { GET_PRODUCTS } from "../graphql/queries";
import { DELETE_PRODUCT, UPDATE_PRODUCT } from "../graphql/mutations";

function ProductList() {
  const [deleteProduct] = useMutation(DELETE_PRODUCT); 
  const [updateProduct] = useMutation(UPDATE_PRODUCT);
  const { loading, error, data, refetch } = useQuery(GET_PRODUCTS);


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleDelete = async (id) => {
    try {
      await deleteProduct({ variables: { id } });
      refetch();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

   const handleEdit = async (p) => {
    try {
      const name = window.prompt("Nama produk:", p.name);
      if (name === null) return; // cancel update
      const priceInput = window.prompt("Harga:", String(p.price));
      if (priceInput === null) return;
      const stockInput = window.prompt("Stock:", String(p.stock));
      if (stockInput === null) return;
      const description = window.prompt("Deskripsi:", p.description || "") ?? p.description;
      const category = window.prompt("Category:", p.category || "") ?? p.category;

      const price = parseFloat(priceInput);
      const stock = parseInt(stockInput, 10);

      await updateProduct({
        variables: {
          id: p.id,
          name,
          price,
          stock,
          description,
          category,
        },
      });

      await refetch();
    } catch (err) {
      console.error("Failed:", err);
      alert("Failed to update");
    }
  };


 return (
    <div>
      <ul>
        {data.products.map((p) => (
          <li key={p.id}>
            <div className="product-info">
            {p.name}
              <div className="price">Rp {p.price}</div>
              <div>Stock: {p.stock}</div>
              {p.description && <div>{p.description}</div>}
              {p.category && <div>Kategori: {p.category}</div>}
            </div>
            <div>
              <button onClick={() => handleEdit(p)}>Edit</button>{" "}
              <button onClick={() => handleDelete(p.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
