import { configureStore } from "@reduxjs/toolkit";
import HomeSliceReducer from "./HomeSlice";
export const store = configureStore({
    reducer:{
       home: HomeSliceReducer,
    },
})