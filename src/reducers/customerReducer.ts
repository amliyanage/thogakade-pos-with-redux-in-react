import {CustomerModel} from "../models/Customer.ts";
import axios from "axios";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const initialState : CustomerModel[] = []

const api = axios.create({
    baseURL : "http://localhost:3000/customer"
})

export const saveCustomer = createAsyncThunk(
    'customer/add',
    async (customer : CustomerModel) => {
        try {
            const response = await api.post('/add', customer);
            return response.data;
        } catch (error) {
            return console.log('error',error)
        }
    }
)

export const getAllCustomers = createAsyncThunk(
    'customer/getAll',
    async () => {
        try {
            const response = await api.get('/getAll');
            return response.data;
        } catch (error) {
            return console.log('error',error)
        }
    }
)

export const delteCustomer = createAsyncThunk(
    'customer/delete',
    async (email : string) => {
        try {
            const response = await api.delete(`/delete/${email}`);
            return response.data;
        } catch (error) {
            return console.log('error',error)
        }
    }
)

export const updateCustomer = createAsyncThunk(
    'customer/update',
    async (customer : CustomerModel) => {
        try {
            const response = await api.put(`/update`, customer);
            return response.data;
        } catch (error) {
            return console.log('error',error)
        }
    }
)

const customerSlice = createSlice({
    name : 'customer',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(saveCustomer.fulfilled,(state, action) => {
                state.push(action.payload);
                alert('Customer added successfully');
                console.log(action.payload)
            })
            .addCase(saveCustomer.pending,(state, action) => {
                console.log(' pending to add customer : ' , action.payload);
            })
            .addCase(saveCustomer.rejected,(state, action) => {
                console.error('failed to add customer : ' , action.payload);
            })
        builder
            .addCase(getAllCustomers.fulfilled,(state, action) => {
                console.log('get all customers : ' , action.payload.length);
                action.payload.forEach((customer : CustomerModel) => {
                    state.push(customer);
                })
            })
            .addCase(getAllCustomers.pending,(state, action) => {
                console.log(' pending to get all customers : ' , action.payload);
            })
            .addCase(getAllCustomers.rejected,(state, action) => {
                console.error('failed to get all customers : ' , action.payload);
            })
        builder
            .addCase(delteCustomer.fulfilled,(state, action) => {
                return state.filter((customer : CustomerModel) => customer.email !== action.payload);
            })
            .addCase(delteCustomer.pending,(state, action) => {
                console.log(' pending to delete customer : ' , action.payload);
            })
            .addCase(delteCustomer.rejected,(state, action) => {
                console.error('failed to delete customer : ' , action.payload);
            })
        builder
            .addCase(updateCustomer.fulfilled,(state, action) => {
                return state.map((customer : CustomerModel) => customer.email === action.payload.email ? action.payload : customer);
            })
            .addCase(updateCustomer.pending,(state, action) => {
                console.log(' pending to update customer : ' , action.payload);
            })
            .addCase(updateCustomer.rejected,(state, action) => {
                console.error('failed to update customer : ' , action.payload);
            })
    }
})

export default customerSlice.reducer;