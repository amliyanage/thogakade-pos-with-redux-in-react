import {configureStore} from "@reduxjs/toolkit";
import customerReducer from "../src/reducers/customerReducer";

export const store = configureStore({
    reducer :{
        customer : customerReducer
    }
})

export type AppDispatch = typeof store.dispatch;