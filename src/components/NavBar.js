import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  deleteProductThunk,
  getCartThunk,
  doPurchaseThunk,
} from "../redux/actions";
import "../styles/navbar.css";
const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState("");
  const [isOpenCart, setIsOpenCart] = useState(false);
  const [total, setTotal] = useState(0);
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(()=>{
    let subTotal = 0
    cart.forEach(product=>{
      subTotal= (Number(product.price) * Number(product.productsInCart.quantity)) + subTotal
    })
    setTotal(subTotal)
  },[cart, setTotal])


  const logIn = (e) => {
    e.preventDefault();
    const credentials = {
      email,
      password,
    };

    axios
      .post(
        "https://ecommerce-api-react.herokuapp.com/api/v1/users/login",
        credentials
      )
      .then((res) => {
        localStorage.setItem("token", res.data.data.token);
        setIsLogin("");
        setEmail("");
        setPassword("");
      })
      .catch((error) => setIsLogin(error.response.data.message));
  };

  return (
    <div>
      <nav>
        <div>
          <strong onClick={() => navigate("/")}>e-commerce</strong>
        </div>
        <button onClick={() => setIsOpen(!isOpen)}>
          <i className="fa-solid fa-user"></i>
        </button>
        <button onClick={() => navigate("/purchases")}>
          <i className="fa-solid fa-box-archive"></i>
        </button>
        <button
          onClick={() => {
            setIsOpenCart(!isOpenCart);
            dispatch(getCartThunk());
          }}
        >
          <i className="fa-solid fa-cart-shopping"></i>
        </button>
      </nav>

      {isOpen && (
        <form onSubmit={logIn}>
          {localStorage.getItem("token") ? (
            <button
              type="button"
              onClick={() => localStorage.setItem("token", "")}
            >
              log out
            </button>
          ) : (
            <>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <button>Log in</button>
              {isLogin && <p>{isLogin}</p>}
            </>
          )}
        </form>
      )}
      {isOpenCart && (
        <div className="cart-modal">
          <h2>Cart</h2>
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                <Link to={`/shop/${item.id}`}>
                  <p>{item.brand}</p>
                  <h3>{item.title}</h3>
                  <p>{item.productsInCart.quantity}</p>
                  <p>{item.price}</p>
                </Link>
                <button onClick={() => dispatch(deleteProductThunk(item.id))}>
                  <i className="fa-solid fa-trash-can"></i>
                </button>
              </li>
            ))}
          </ul>
          {cart.length !== 0 ? (
            <div>
              <p>{total}</p>
              <button onClick={() => dispatch(doPurchaseThunk())}>Buy</button>
            </div>
          ) : (
            <p>Empty cart</p>
          )}
        </div>
      )}
    </div>
  );
};

export default NavBar;
