import { configureStore } from '@reduxjs/toolkit';
import SearchInputVal from "../reducer/SearchInputVal";

export default configureStore({
    reducer: {
        SearchInputVal: SearchInputVal
    },
})