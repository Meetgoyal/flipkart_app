import { configureStore } from '@reduxjs/toolkit'
import CartListReducer from '../reducers/CartListReducer'
import ProductListReducer from '../reducers/ProductListReducer'
export default configureStore({
  reducer: {
    products : ProductListReducer,
    cartlist : CartListReducer,
  }
})