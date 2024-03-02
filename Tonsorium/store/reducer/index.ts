import { combineReducers } from 'redux';
import ServiceSlice from '../slice/ServiceSlice';
import StaffSlice from '../slice/StaffSlice'

const rootReducer = combineReducers({
    staffReducer: StaffSlice,
    serviceReducer: ServiceSlice,
    
});
export default rootReducer;
