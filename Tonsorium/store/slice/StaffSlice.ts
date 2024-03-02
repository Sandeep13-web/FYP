import { createSlice } from "@reduxjs/toolkit";
import {getStaff} from '../actions/StaffActionCreator'

const initialState ={
    staffData: null,
    staffLoading: false
}

const StaffSlice = createSlice({
    name: 'staff',
    initialState,
    reducers:{},
    extraReducers:{
        [getStaff.pending.toString()]: state => {
            state.staffLoading= true;
        },
        [getStaff.fulfilled.toString()]: (state, action) => {
            state.staffLoading= false;
            state.staffData= action.payload;
        },
        [getStaff.rejected.toString()]: state => {
            state.staffLoading= false;
        }
    }
})

export default StaffSlice.reducer