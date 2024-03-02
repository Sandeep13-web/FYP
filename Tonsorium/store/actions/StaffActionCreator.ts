import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getStaff = createAsyncThunk<any,any>(
    'get/staff',
    async({staffName}) => {
        try {
            // const respons
            let apiUrl= `http://localhost:8000/staff`
            if(staffName !== undefined) {
              apiUrl+= `?staffName_like=${staffName}`
            }
            const response = await axios.get(apiUrl)
            if(response.status === 200) {
                return response.data                
            }
          } catch (error) {
            console.log(error);
            return{}
          }
    }
)