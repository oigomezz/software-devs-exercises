import { useState } from "react";
import "./Filters.css";

export function Filters({changefilters}) {
  const [minPrice, setMinPrice] = useState(0);

  const handleChangeMinPrice = (event) => {
    setMinPrice(event.target.value);
    changefilters( prevState => ({
        ...prevState,
        minPrice: event.target.value
    }))
  };


  const handleChangeCategory = (event) => {
    changefilters( prevState => ({
        ...prevState,
        category: event.target.value
    }))
  };

  return (
    <section className="filters">
      <div>
        <label htmlFor="price">Precio mínimo</label>
        <input type="range" id="price" min="0" max="1000" onChange={handleChangeMinPrice} />
        <span>${minPrice}</span>
      </div>
      <div>
        <label htmlFor="category">Categoria</label>
        <select id="category" onChange={handleChangeCategory}>
          <option value="all"> Todas </option>
          <option value="laptops"> Portatiles </option>
          <option value="smartphones"> Celulares </option>
        </select>
      </div>
    </section>
  );
}
