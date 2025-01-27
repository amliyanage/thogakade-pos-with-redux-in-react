import {Item} from "../models/Item.ts";
import axios from "axios";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const intialState : Item[] = []

const api = axios.create({
    baseURL : "http://localhost:3000/item"
})

export const saveItem = createAsyncThunk(
    'item/add',
    async (item : Item) => {
        try {
            const response = await api.post('/add', item);
            return response.data;
        } catch (error) {
            return console.log('error',error)
        }
    }
)

export const getAllItems = createAsyncThunk(
    'item/getAll',
    async () => {
        try {
            const response = await api.get('/getAll');
            return response.data;
        } catch (error) {
            return console.log('error',error)
        }
    }
)

export const deleteItem = createAsyncThunk(
    'item/delete',
    async (id : string) => {
        try {
            const response = await api.delete(`/delete/${id}`);
            return response.data;
        } catch (error) {
            return console.log('error',error)
        }
    }
)

export const updateItem = createAsyncThunk(
    'item/update',
    async (item : Item) => {
        try {
            const response = await api.put(`/update`, item);
            return response.data;
        } catch (error) {
            return console.log('error',error)
        }
    }
)

const itemReducer = createSlice({
    name : 'item',
    initialState : intialState,
    reducers : {},
    extraReducers : (builder) => {
        builder
            .addCase(saveItem.fulfilled, (state, action) => {
                state.push(action.payload);
            })
            .addCase(saveItem.pending, (state, action) => {
                console.log('save item pend' , action.payload);
            })
            .addCase(saveItem.rejected, (state, action) => {
                console.log('save item reject' , action.payload);
            })
        builder
            .addCase(getAllItems.fulfilled, (state, action) => {
                action.payload.map((item : Item) => {
                    state.push(item);
                })
            })
            .addCase(getAllItems.pending, (state, action) => {
                console.log('get all item pend' , action.payload);
            })
            .addCase(getAllItems.rejected, (state, action) => {
                console.log('get all item reject' , action.payload);
            })
        builder
            .addCase(deleteItem.fulfilled, (state, action) => {
                return state.filter((item : Item) => item.id !== action.payload);
            })
            .addCase(deleteItem.pending, (state, action) => {
                console.log('delete item pend' , action.payload);
            })
            .addCase(deleteItem.rejected, (state, action) => {
                console.log('delete item reject' , action.payload);
            })
        builder
            .addCase(updateItem.fulfilled, (state, action) => {
                return state.map((item : Item) => item.id === action.payload.id ? action.payload : item);
            })
            .addCase(updateItem.pending, (state, action) => {
                console.log('update item pend' , action.payload);
            })
            .addCase(updateItem.rejected, (state, action) => {
                console.log('update item reject' , action.payload);
            })
    }
})

export default itemReducer.reducer;