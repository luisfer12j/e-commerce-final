import axios from "axios";

export const actions = {
  setIsLoading: "SET_IS_LOADING",
  setProducts: "SET_PRODUCTS",
  setCategories: "SET_CATEGORIES",
  setCart: "SET_CART",
  setPurchases: "SET_PURCHASES",
};

const getConfig = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

export const setPurchases = (purchase) => ({
  type: actions.setPurchases,
  payload: purchase,
});

export const setCart = (cart) => ({
  type: actions.setCart,
  payload: cart,
});

export const setIsLoading = (isLoading) => ({
  type: actions.setIsLoading,
  payload: isLoading,
});

export const setProducts = (products) => ({
  type: actions.setProducts,
  payload: products,
});

export const setCategories = (categories) => ({
  type: actions.setCategories,
  payload: categories,
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

export const getCategoriesThunk = () => {
  return (dispatch) => {
    dispatch(setIsLoading(true));
    axios
      .get(
        "https://ecommerce-api-react.herokuapp.com/api/v1/products/categories"
      )
      .then((res) => dispatch(setCategories(res.data.data.categories)))
      .finally(() => dispatch(setIsLoading(false)));
  };
};

export const filterCategoryThunk = (id) => {
  return (dispatch) => {
    dispatch(setIsLoading(true));
    axios
      .get(
        `https://ecommerce-api-react.herokuapp.com/api/v1/products?category=${id}`
      )
      .then((res) => dispatch(setProducts(res.data.data.products)))
      .finally(() => dispatch(setIsLoading(false)));
  };
};

export const filterNameThunk = (search) => {
  return (dispatch) => {
    dispatch(setIsLoading(true));
    axios
      .get(
        `https://ecommerce-api-react.herokuapp.com/api/v1/products?query=${search}`
      )
      .then((res) => dispatch(setProducts(res.data.data.products)))
      .finally(() => dispatch(setIsLoading(false)));
  };
};

export const addProductThunk = (body) => {
  return (dispatch) => {
    dispatch(setIsLoading(true));
    axios
      .post(
        "https://ecommerce-api-react.herokuapp.com/api/v1/cart",
        body,
        getConfig()
      )
      .finally(() => dispatch(setIsLoading(false)));
  };
};

export const getCartThunk = () => {
  return (dispatch) => {
    dispatch(setIsLoading(true));
    axios
      .get("https://ecommerce-api-react.herokuapp.com/api/v1/cart", getConfig())
      .then((res) => {
        console.log(res.data.data.cart.products);
        dispatch(setCart(res.data.data.cart.products));
      })
      .catch((error) => {
        if (error.response.data.estatus === 404) {
          dispatch(setCart([]));
        }
      })
      .finally(() => dispatch(setIsLoading(false)));
  };
};

export const deleteProductThunk = (id) => {
  return (dispatch) => {
    dispatch(setIsLoading(true));
    axios
      .delete(
        `https://ecommerce-api-react.herokuapp.com/api/v1/cart/${id}`,
        getConfig()
      )
      .then(() => dispatch(getCartThunk()))
      .finally(() => dispatch(setIsLoading(false)));
  };
};

export const doPurchaseThunk = () => {
  return (dispatch) => {
    dispatch(setIsLoading(true));
    axios
      .post(
        "https://ecommerce-api-react.herokuapp.com/api/v1/purchases",
        {},
        getConfig()
      )
      .then(() => alert("Purchase successfully"))
      .finally(() => dispatch(setIsLoading(false)));
  };
};

export const getPurchasesThunk = () => {
  return (dispatch) => {
    dispatch(setIsLoading(true));
    axios
      .get(
        "https://ecommerce-api-react.herokuapp.com/api/v1/purchases",
        getConfig()
      )
      .then((res) => {
        dispatch(setPurchases(res.data.data.purchases));
      })
      .finally(() => dispatch(setIsLoading(false)));
  };
};
