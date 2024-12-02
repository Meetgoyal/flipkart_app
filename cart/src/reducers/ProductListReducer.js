import { createSlice } from '@reduxjs/toolkit'

export const productListSlice = createSlice({
  name: 'products',
  initialState: {
    list: [],
    isLogin : false
  },
  reducers: {
    setProducts : (state,action) => {
      state.list = action.payload
    },
    changeLogin : (state) => {
      state.isLogin = state.isLogin ? false : true;
    }
  }
})

// Action creators are generated for each case reducer function
export const { setProducts,changeLogin } = productListSlice.actions

export default productListSlice.reducer