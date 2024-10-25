import { configureStore } from '@reduxjs/toolkit';
import treeSliceReducer from '../slices/treeSlice';

const store = configureStore({
    reducer: treeSliceReducer
});

export default store