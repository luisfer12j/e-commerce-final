import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  filterCategoryThunk,
  getCategoriesThunk,
  getProductsThunk,
} from "../redux/actions";
import "../styles/home.css";

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const categories = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(getProductsThunk());
    dispatch(getCategoriesThunk());
  }, [dispatch]);
  return (
    <div>
      <ul>
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
      <ul className="products-list">
        {products.map((product) => (
          <li key={product.id}>
            <Link to={`/products/${product.id}`} className="card-product">
              <img src={product.productImgs[0]} />
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
