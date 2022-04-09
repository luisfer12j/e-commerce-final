import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getProductsThunk } from "../redux/actions";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProductsThunk());
  }, [dispatch]);

  const product = products.find((product) => product.id === Number(id));

  const [productsSimilar, setProductsSimilar] = useState([]);

  useEffect(() => {
    if (product) {
      axios
        .get(
          `https://ecommerce-api-react.herokuapp.com/api/v1/products?category=${product.category.id}`
        )
        .then((res) =>
          setProductsSimilar(
            res.data.data.products.filter(
              (productSimilar) => productSimilar.id !== product.id
            )
          )
        );
    }
  }, [product, setProductsSimilar]);
  console.log(productsSimilar);
  return (
    <section>
      <div className="product-info">
        <div className="product-gallery">
          <img src={product?.productImgs[0]} alt="" />
        </div>
        <div className="product-decription">
          <h2>{product?.title}</h2>
          <div className="product-data">
            <div className="product-options">
              <div>
                <div>
                  <h3>Price</h3>
                  <p>{product?.price}</p>
                </div>
                <div></div>
              </div>
              <button>Add to cart</button>
            </div>
            <p className="product-description">{product?.description}</p>
          </div>
        </div>
      </div>

      <div className="products-similar">
        <h3>Discover similar items</h3>
        <ul>
          {productsSimilar.map((item) => (
            <li key={item.id}>
              <Link to={`/shop/${item.id}`} className="card-product">
                <img src={item.productImgs[0]} alt="product img" />
                <div>
                  <h2 className="title-product">{item.title}</h2>
                  <p>Price</p>
                  <p>$ {item.price}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ProductDetail;
