import {Order} from "../models/Order.ts";
import axios from "axios";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const initialState : Order[] = []

const api = axios.create({
    baseURL : "http://localhost:3000/order"
})

export const saveOrder = createAsyncThunk(
    'order/add',
    async (order : Order) => {
        try {
            const response = await api.post('/place-order', order);
            return response.data;
        } catch (error) {
            return console.log('error',error)
        }
    }
)

const orderReducer = createSlice({
    name : 'order',
    initialState,
    reducers : {},
    extraReducers : builder => {
        builder
            .addCase(saveOrder.fulfilled, (state, action) => {
            state.push(action.payload);
            })
            .addCase(saveOrder.rejected, (state, action) => {
            console.log('error',action.error)
            })
            .addCase(saveOrder.pending, (state, action) => {
                console.log('loading')
            })
    }
})

export default orderReducer.reducer;