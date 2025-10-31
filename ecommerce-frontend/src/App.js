import "./App.css";
import ProductList from "./components/productList";
import AddProduct from "./components/addProduct";

function App() {
  return (
    <div className="container">
      <h1>Catalog</h1>
        <ProductList />
      <div className="add-product">
      <h1>Add Product</h1>
        <AddProduct />
      </div>  
    </div>
  );
}

export default App;
