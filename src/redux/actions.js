import axios from "axios";

export const actions = {
  setIsLoading: "SET_IS_LOADING",
  setProducts: "SET_PRODUCTS",
};

export const setIsLoading = (isLoading) => ({
  type: actions.setIsLoading,
  payload: isLoading,
});

export const setProducts = (products) => ({
  type: actions.setProducts,
  payload: products,
});

export const getProductsThunk = () => {
  return (dispatch) => {
    dispatch(setIsLoading(true));
    axios
      .get("https://ecommerce-api-react.herokuapp.com/api/v1/products")
      .then((res) => dispatch(setProducts(res.data.data.products)))
      .finally(() => dispatch(setIsLoading(false)));
  };
};
