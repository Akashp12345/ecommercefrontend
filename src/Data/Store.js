import {configureStore} from '@reduxjs/toolkit'
import productSlice from "../Data/Reducer"
const Store=configureStore({
      reducer:{
            data:productSlice
      }
})
export default Store