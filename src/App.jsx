import "./App.css";
import { Header } from "./components/Header.jsx";
import { Products } from "./components/Products.jsx";
import { Footer } from "./components/Footer.jsx";
import { useFilters } from "./hooks/useFilters.jsx";

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
