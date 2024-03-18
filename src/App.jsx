import "./App.css";
import { Header } from "./components/Header";
import { Products } from "./components/Products";
import { Footer } from "./components/Footer.jsx";
import { useFilters } from "./hooks/useFilters.js";

import { IS_DEVELOPMENT } from "./config.js";
import { products as initialProducts } from "./mocks/products.json";

function App() {
  const { filterProducts } = useFilters();

  const filteredProducts = filterProducts(initialProducts);

  return (
    <>
      <Header />
      <Products products={filteredProducts} />
      {IS_DEVELOPMENT && <Footer />}
    </>
  );
}

export default App;
