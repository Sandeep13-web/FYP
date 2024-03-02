import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducer';

const reduxStore = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;

export default reduxStore;
