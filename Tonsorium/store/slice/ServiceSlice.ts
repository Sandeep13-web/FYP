import { createSlice } from "@reduxjs/toolkit";
import {getService} from '../actions/ServiceActionCreator'

const initialState ={
    serviceData: null,
    serviceLoading: false
}

const ServiceSlice = createSlice({
    name: 'service',
    initialState,
    reducers:{},
    extraReducers:{
        [getService.pending.toString()]: state => {
            state.serviceLoading= true;
        },
        [getService.fulfilled.toString()]: (state, action) => {
            state.serviceLoading= false;
            state.serviceData= action.payload;
        },
        [getService.rejected.toString()]: state => {
            state.serviceLoading= false;
        }
    }
})

export default ServiceSlice.reducer