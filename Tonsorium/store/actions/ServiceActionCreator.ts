import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getService = createAsyncThunk<any,any>(
    'get/service',
    async() => {
        try {
            const response = await axios.get('http://localhost:8000/services');
            if(response.status === 200) {
                return response.data
            }
          } catch (error) {
            console.log(error);
            return{}
          }
    }

)