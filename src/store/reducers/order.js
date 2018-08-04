import * as actions from "../actions/actions";
import { updateObject } from "../utility";

const initialState = {
  orders: [],
  loading: false,
  purchased: false
};

const purchaseInit = (state, action) => {
  return updateObject(state, { purchased: false });

}
const purchaseBurgerStart = (state, action) => {
  return updateObject(state, { loading: true });
}
const purchaseBurgerSuccess = (state, action) => {
  const newOrder = updateObject(action.orderData, {
    id: action.orderId
  });

  return updateObject(state, {
    loading: false,
    orders: state.orders.concat(newOrder),
    purchased: true
  });
}

const purchaseBurgerFail = (state, action) => {
  return updateObject(state, {
    loading: false
  });
}

const fetchOrdersStart = (state, action) => {
  return updateObject(state, {
    loading: true
  });
}
const fetchOrderSuccess = (state, action) => {
  return updateObject(state, {
    orders: action.orders,
    loading: false
  });
}
const fetchOrderFail = (state, action) => {
  return updateObject(state, {
    loading: false
  });
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.PURCHASE_INIT: return purchaseInit(state, action);
    case actions.PURCHASE_BURGER_START: return purchaseBurgerStart(state, action);
    case actions.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action);
    case actions.PURCHASE_BURGER_FAIL: return purchaseBurgerFail(state, action);
    case actions.FETCH_ORDERS_START: return fetchOrdersStart(state, action);
    case actions.FETCH_ORDERS_SUCCESS: return fetchOrderSuccess(state, action);
    case actions.FETCH_ORDERS_FAIL: return fetchOrderFail(state, action);
    default:
      return state;
  }
};

export default reducer;
