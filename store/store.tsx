import {configureStore} from "@reduxjs/toolkit";
import customerReducer from "../src/reducers/customerReducer";
import itemReducer from "../src/reducers/itemReducer.ts";
import orderReducer from "../src/reducers/orderReducer.ts";

export const store = configureStore({
    reducer :{
        customer : customerReducer,
        item : itemReducer,
        order : orderReducer
    }
})

export type AppDispatch = typeof store.dispatch;