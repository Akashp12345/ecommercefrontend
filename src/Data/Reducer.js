import { createSlice } from "@reduxjs/toolkit";

const data = {
  email: "",
  FullName: "",
  isClicked: false,
};

const ProductSlice = createSlice({
  name: "product",
  initialState: data,
  reducers: {
    SetLogin(state, action) {
      state.email = action.payload.email;
      state.FullName = action.payload.FullName;
    },
    isWantLogin(state, action) {
      state.isClicked = action.payload;
    },
  },
});
export const { SetLogin ,isWantLogin} = ProductSlice.actions;
export default ProductSlice.reducer;
