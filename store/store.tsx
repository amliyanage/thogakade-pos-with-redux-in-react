import {configureStore} from "@reduxjs/toolkit";
import customerReducer from "../src/reducers/customerReducer";
import itemReducer from "../src/reducers/itemReducer.ts";

export const store = configureStore({
    reducer :{
        customer : customerReducer,
        item : itemReducer,
    }
})

export type AppDispatch = typeof store.dispatch;