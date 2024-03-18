import "./App.css";
import { Header } from "./components/Header";
import { Products } from "./components/Products";
import { Footer } from './components/Footer.jsx'
import { IS_DEVELOPMENT } from './config.js'

import { products as initialProducts } from "./mocks/products.json";
import { useState } from "react";

function useFilters() {
  const [filters, setFilters] = useState({
    category: "all",
    minPrice: 0,
  });

  const filterProducts = (products) => {
    return products.filter((product) => {
      return (
        product.price >= filters.minPrice &&
        (filters.category === "all" || product.category === filters.category)
      );
    });
  };

  return { filters, filterProducts, setFilters };
}

function App() {
  const [products] = useState(initialProducts);
  const { filters, filterProducts, setFilters } = useFilters();

  const filteredProducts = filterProducts(products);

  return (
    <>
      <Header changefilters={setFilters} />
      <Products products={filteredProducts} />
      {IS_DEVELOPMENT && <Footer filters={filters}/>}
    </>
  );
}

export default App;
