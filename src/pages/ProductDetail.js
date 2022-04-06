import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductsThunk } from "../redux/actions";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProductsThunk());
  }, [dispatch]);

  const product = products.find((product) => product.id === Number(id));

  return (
    <div>
      <div className="product-info">
        <div className="product-gallery">
          <img src={product.productImgs[0]} />
        </div>
        <div className="product-decription">
          <h2>{product.title}</h2>
          <div className="product-data">
            <div className="product-options">
              <div>
                <div>
                  <h3>Price</h3>
                  <p>{product.price}</p>
                </div>
                <div></div>
              </div>
              <button>Add to cart</button>
            </div>
            <p className="product-description">{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
