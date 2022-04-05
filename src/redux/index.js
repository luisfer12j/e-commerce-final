import { actions } from "./actions";

const INITIAL_STATE = {
  isLoading: false,
  products: [],
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.setIsLoading:
      return {
        ...state,
        isLoading: action.payload,
      };

    case actions.setProducts:
      return {
        ...state,
        products: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
