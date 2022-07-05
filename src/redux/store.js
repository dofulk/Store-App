import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cartSlice'
import productsReducer from './productsSlice'
import checkoutReducer from './checkoutSlice'

export default configureStore({
    reducer: {
      cart: cartReducer,
      products: productsReducer,
      checkout: checkoutReducer,
    },
  })