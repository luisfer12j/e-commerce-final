import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { addProductThunk, getProductsThunk } from "../redux/actions";
import '../styles/productDetail.css'


const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const [counter, setCounter] = useState(1);
  const [position,setPosition] = useState(0);

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

  return (
    <section className="product-detail">
      <div className="history-container">
        <a href="#/">Home</a>
        <div className="circle"></div>
        <b>{product?.title}</b>
      </div>
      <div className="product-info">
        <div className="product-gallery colum">
          <div className="main-image">
            <button className="button-gallery" onClick={()=>{
              if(position > 0 ){
                setPosition(position - 1)
                }
              }
              }><i className="fa-solid fa-chevron-left"></i>
            </button>
            <div className="main-image-container">
              <img src={product?.productImgs[position]} alt="" />
            </div>
            <button className="button-gallery" onClick={()=>{
              if(position < 2){
                setPosition(position + 1)
                }
              }}
              ><i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
          <div className="secundary-images">
            {product?.productImgs.map(img=>(
              <div className="secundary-image-container" key={img}>
                <img onClick={()=>setPosition(product?.productImgs.findIndex((item)=>item===img))} className={position===product?.productImgs.findIndex((item)=>item===img) ?'border-img' :""} src={img} alt="" />
              </div>
            ))}
          </div>
        </div>
        <div className="product-decription colum">
          <h2>{product?.title}</h2>
          <div className="product-data">
          <button
                  onClick={() => {
                    const body = {
                      id: id,
                      quantity: counter,
                    };
                    dispatch(addProductThunk(body));
                  }}
                >
                  Add to cart
            </button>
            <div className="product-options">
              <div>
                <p className="gray">Price</p>
                <h3>{`$${product?.price}`}</h3>
              </div>
              <div>
                <div className="counter-container">
                  <p className="gray">Quantity</p>
                  <div className="quantity-container">
                    <button
                      onClick={() => {
                        if (counter > 1) {
                          setCounter(counter - 1);
                        }
                      }}
                    >
                      -
                    </button>
                    <p>{counter}</p>
                    <button onClick={() => setCounter(counter + 1)}>+</button>
                  </div>
                </div>
              </div>
            </div>
            <p className="product-description">{product?.description}</p>
          </div>
        </div>
      </div>
      <div className="products-similar width">
        <h3>Discover similar items</h3>
        <ul className="products-list width">
          {productsSimilar.map((item) => (
            <li key={item.id}>
              <Link to={`/shop/${item.id}`} className="card-product">
                <img src={item.productImgs[0]} alt="product img" />
                <div className="text-container">
                  <h2 className="title-product">{item.title}</h2>
                  <p>Price</p>
                  <h3>$ {item.price}</h3>
                </div>
              </Link>
              <button className="button-add-cart" onClick={()=>{
                  const body = {
                    id: product.id,
                    quantity: "1",
                  };
                  dispatch(addProductThunk(body));
                  }
                }><i className="fa-solid fa-cart-shopping"></i>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ProductDetail;
