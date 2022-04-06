import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  filterCategoryThunk,
  getCategoriesThunk,
  getProductsThunk,
  filterNameThunk,
} from "../redux/actions";
import "../styles/home.css";

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const categories = useSelector((state) => state.categories);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getProductsThunk());
    dispatch(getCategoriesThunk());
  }, [dispatch]);

  const submit = (e) => {
    e.preventDefault();
    dispatch(filterNameThunk(search));
    setSearch("");
  };

  return (
    <div>
      <form className="input-form" onSubmit={submit}>
        <input
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          placeholder="what are you looking for?"
        />
        <button>Search</button>
      </form>

      <ul>
        <h2>Categories</h2>
        <button onClick={() => dispatch(getProductsThunk())}>
          All Products
        </button>

        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => dispatch(filterCategoryThunk(category.id))}
          >
            {category.name}
          </button>
        ))}
      </ul>

      {products.length === 0 && <p>Products not found</p>}

      <ul className="products-list">
        {products.map((product) => (
          <li key={product.id}>
            <Link to={`/shop/${product.id}`} className="card-product">
              <img src={product.productImgs[0]} alt="product img" />
              <div>
                <h2 className="title-product">{product.title}</h2>
                <p>Price</p>
                <p>$ {product.price}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
