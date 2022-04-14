import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPurchasesThunk } from "../redux/actions";

const Purchases = () => {
  const dispatch = useDispatch();
  const purchases = useSelector((state) => state.purchases);

  useEffect(() => {
    dispatch(getPurchasesThunk());
  }, [dispatch]);

  return (
    <section>
      <h1>Purchases</h1>
      <ul>
        {purchases.map((purchase) => (
          <li key={purchase?.id}>
            <h3>{purchase?.createdAt}</h3>
            <ul>
              {purchase.cart.products.map((product) => (
                <li key={product.id}>
                  <p>{product.title}</p>
                  <p>{product.productsInCart.quantity}</p>
                  <p>
                    price: ${" "}
                    {product.productsInCart.quantity * Number(product.price)}
                  </p>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Purchases;
