import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  filterCategoryThunk,
  getCategoriesThunk,
  getProductsThunk,
  filterNameThunk,
  addProductThunk,
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
    <section className="section-container">
      <form className="input-form" onSubmit={submit}>
        <input
          className="input-search"
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          placeholder="what are you looking for?"
        />
        <button className="button-search">Search</button>
      </form>
      <main className="main">
        <aside className="aside">
          <h2 className="categories-h2">Categories</h2>
          <ul className="categories-list">
            <button className="category-button" onClick={() => dispatch(getProductsThunk())}>
              All Products
            </button>

            {categories.map((category) => (
              <button
                className="category-button"
                key={category.id}
                onClick={() => dispatch(filterCategoryThunk(category.id))}
              >
                {category.name}
              </button>
            ))}
          </ul>
        </aside>

        {products.length === 0 && <p>Products not found</p>}

        <ul className="products-list">
          {products.map((product) => (
            <li key={product.id}>
              <Link to={`/shop/${product.id}`} className="card-product">
                <img src={product.productImgs[0]} alt="product img" />
                <div className="text-container">
                  <h2 className="title-product">{product.title}</h2>
                  <p>Price</p>
                  <h3>$ {product.price}</h3>
                </div>
              </Link>
              <button className="button-add-cart" onClick={()=>{
                    const body = {
                      id: product.id,
                      quantity: "1",
                    };
                    dispatch(addProductThunk(body));
                    }
                }><i className="fa-solid fa-cart-shopping"></i></button>
            </li>
          ))}
        </ul>
      </main>
    </section>
  );
};

export default Home;
