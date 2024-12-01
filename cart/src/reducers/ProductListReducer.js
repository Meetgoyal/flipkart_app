import { createSlice } from '@reduxjs/toolkit'

export const productListSlice = createSlice({
  name: 'products',
  initialState: {
    list: []
  },
  reducers: {
    setProducts : (state,action) => {
      state.list = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { setProducts } = productListSlice.actions

export default productListSlice.reducer