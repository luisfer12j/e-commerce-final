import React, { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPurchasesThunk } from "../redux/actions";
import '../styles/purchases.css'



const Purchases = () => {
  const dispatch = useDispatch();
  const purchases = useSelector((state) => state.purchases);

  // console.log(purchases)

  // const dateToString = (aux)=>{
  //   console.log(aux)
  //   var dateAux = new Date(aux);
  //   console.log(dateAux)
  //   return `${dateAux}`
  // }

  useEffect(() => {
    dispatch(getPurchasesThunk());
  }, [dispatch]);

  return (
    <section className="purchases">
      <div className="history-container">
        <a href="#/">Home</a>
        <div className="circle"></div>
        <b>purchases</b>
      </div>
      <h1>My purchases</h1>
      {purchases.map((purchase) => (
        <div className="purchase-container" key={purchase?.id}>
          <div className="date-container">
            <h3>{purchase?.createdAt.slice(0,10)}</h3>
          </div>
          <ul className="purchases-products-list">
            {purchase.cart.products.map((product) => (
              <li key={product.id}>
                <p className="space">{product.title}</p>
                <p className="border">{product.productsInCart.quantity}</p>
                <p >
                  $ {product.productsInCart.quantity * Number(product.price)}
                </p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
};

export default Purchases;
