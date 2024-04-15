import { useEffect, useState } from "react";
import { Products } from "./components/Products.jsx";
import { Header } from "./components/Header.jsx";
import { Footer } from "./components/Footer.jsx";
import { Cart } from "./components/Cart.jsx";

import { IS_DEVELOPMENT } from "./config.js";
import { useFilters } from "./hooks/useFilters.jsx";
import { CartProvider } from "./context/cart.jsx";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products`)
      .then((response) => response.json())
      .then((products) => {
        const newProducts = products?.map((product) => ({
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          category: product.category,
        }));
        setProducts(newProducts);
        setIsLoading(false);
      });
  }, [isLoading]);

  const { filterProducts } = useFilters();
  const filteredProducts = filterProducts(products);

  if (isLoading) {
    return (
      <div className="App">
        <h1>Cargando...</h1>
      </div>
    );
  }

  return (
    <CartProvider>
      <Header />
      <Cart />
      <Products products={filteredProducts} />
      {IS_DEVELOPMENT && <Footer />}
    </CartProvider>
  );
}

export default App;
