import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  deleteProductThunk,
  getCartThunk,
  doPurchaseThunk,
  createNewAccountThunk,
} from "../redux/actions";
import "../styles/navbar.css";
const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState("");
  const [isOpenCart, setIsOpenCart] = useState(false);
  const [total, setTotal] = useState(0);
  const [newFirstName, setNewFirstName] = useState('');
  const [newLastName, setNewLastName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newRole, setNewRole] = useState('');
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

  useEffect(()=>{

  },[])

  const createNewAccount = e =>{
    e.preventDefault();
    const newUser ={
      firstName: newFirstName,
      lastName: newLastName,
      email: newEmail,
      password: newPassword,
      phone: newPhone,
      role: newRole
    }

    dispatch(createNewAccountThunk(newUser))

    setNewEmail('');
    setNewFirstName('');
    setNewPassword('');
    setNewPhone('');
    setNewRole('');
    setNewLastName('');
  }

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
        localStorage.setItem('userName', `${res.data.data.user.firstName} ${res.data.data.user.lastName}`)
        setIsLogin("");
        setEmail("");
        setPassword("");
      })
      .catch((error) => setIsLogin(error.response.data.message));
  };

  return (
    <div className="nav-bar">
      <nav className="nav">
        <div className="logo-container">
          <strong onClick={() => navigate("/")}>e-commerce</strong>
        </div>

        <button className='nav-button-container' onClick={() => setIsOpen(!isOpen)}>
          <i className="fa-solid fa-user"></i>
        </button>
        <button 
          className='nav-button-container'
          onClick={() => {
              localStorage.getItem("token")
                ? navigate("/purchases")
                : setIsOpen(!isOpen);
          }}
        >
          <i className="fa-solid fa-box-archive"></i>
        </button>
        <button
          className='nav-button-container'
          onClick={() => {
            if (localStorage.getItem("token")) {
              setIsOpenCart(!isOpenCart);
              dispatch(getCartThunk());
            } else {
              setIsOpen(!isOpen);
            }
          }}
        >
          <i className="fa-solid fa-cart-shopping"></i>
        </button>
      </nav>
      <div className={`login-modal ${isOpen ? 'open': ''}`}>
        {localStorage.getItem("token") ? (
          <div className="test-container">
            <img className="test-img" src="https://thumbs.dreamstime.com/b/icono-de-usuario-personas-vectoriales-vector-perfil-ilustraci%C3%B3n-persona-comercial-s%C3%ADmbolo-grupo-usuarios-masculino-195157776.jpg
                " alt="" />
            <div className="account-text">
              <h3 className="center">{localStorage.getItem('userName')}</h3>
              <p className="center">
                <span onClick={() => {
                  localStorage.setItem("token", "")
                  localStorage.setItem("userName",'')
                  setIsOpen(false)
                  }}>Log out</span> 
              </p>
            </div>
          </div>
        ) : (
            signUp ? 
            <form onSubmit={createNewAccount}>
              <div className="test-container">
                <img className="test-img" src="https://thumbs.dreamstime.com/b/icono-de-usuario-personas-vectoriales-vector-perfil-ilustraci%C3%B3n-persona-comercial-s%C3%ADmbolo-grupo-usuarios-masculino-195157776.jpg
                " alt="" />
              </div>
              <div className="input-container">
                <label>First name</label>
                <input type="text" onChange={e=>setNewFirstName(e.target.value)} value={newFirstName}/>
              </div>
              <div className="input-container">
                <label>Last name</label>
                <input type="text" onChange={e=>setNewLastName(e.target.value)} value={newLastName}/>
              </div>
              <div className="input-container">
                <label>Email</label>
                <input type="text" onChange={e=>setNewEmail(e.target.value)} value={newEmail}/>
              </div>
              <div className="input-container">
                <label>Password</label>
                <input type="password" onChange={e=>setNewPassword(e.target.value)} value={newPassword}/>
              </div>
              <div className="input-container">
                <label>Phone</label>
                <input type="text" onChange={e=>setNewPhone(e.target.value)} value={newPhone}/>
              </div>
              <div className="input-container">
                <label>Role</label>
                <input type="text" onChange={e=>setNewRole(e.target.value)} value={newRole}/>
              </div>
              <button className="login-button">Create</button>
              <div className="account-text">
                <p>Have an account? <span onClick={()=>setSignUp(false)}>Log in</span></p>
              </div>
            </form>
            :
            <>
              <div className="test-container">
                <img className="test-img" src="https://thumbs.dreamstime.com/b/icono-de-usuario-personas-vectoriales-vector-perfil-ilustraci%C3%B3n-persona-comercial-s%C3%ADmbolo-grupo-usuarios-masculino-195157776.jpg
                " alt="" />
                <div className="test-text-container">
                  <h3>Test data</h3>
                  <div>
                    <i className="fa-solid fa-envelope"></i>
                    <p>fh@gmail.com</p>
                  </div>
                  <div>
                    <i className="fa-solid fa-lock"></i>
                    <p>12345678</p>
                  </div>
                </div>
              </div>
              <form className="login-modal-container" onSubmit={logIn}>
                <div className="input-container">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </div>
                <div className="input-container">
                  <label htmlFor="password">Password</label>
                  <input
                    id="password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                </div>
                <button className="login-button">Log in</button>
              </form>
              <div className="account-text">
                <p>
                  Don't have an account? <span onClick={() => setSignUp(true)}> Sign up</span>
                </p>
              </div>
              {isLogin && <p>{isLogin}</p>}
            </>
            
        )}
      </div>
      {isOpenCart && (
        <div className="cart-modal">
          <div className="cart-modal-container">
            <h2 className="cart-name">Cart</h2>
            <ul className="cart-list">
              {cart.map((item) => (
                <li className="cart-product-container" key={item.id}>
                  <Link className="cart-product-description" to={`/shop/${item.id}`}>
                    <div className="product-description">
                      <div>
                        <p className="color-light-gray">{item.brand}</p>
                        <h3>{item.title}</h3>
                        <div className="border">{item.productsInCart.quantity}</div>
                      </div>
                      <div>
                      </div>
                    </div>
                    <div className="product-price ">
                      <p className="color-light-gray">Price: <span>{`$${item.price}`}</span></p>
                    </div>
                  </Link>
                        <button className="cart-product-delete" onClick={() => dispatch(deleteProductThunk(item.id))}>
                          <i className="fa-solid fa-trash-can"></i>
                        </button>
                </li>
              ))}
            </ul>
          </div>
          {cart.length !== 0 ? (
            <div className="cart-button-container">
              <div className="cart-total-container">
                <p className="color-light-gray">Total:</p>
                <p className="cart-total">{`$${total}`}</p>
              </div>
              <button onClick={() => dispatch(doPurchaseThunk())}>Buy</button>
            </div>
          ) : (
            <div className="cart-button-container">
              <div className="cart-total-container">
                <p className="color-light-gray">Total:</p>
                <p className="cart-total">0</p>
              </div>
              <button >Buy</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NavBar;
