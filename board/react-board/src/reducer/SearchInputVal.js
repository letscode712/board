import { createSlice } from '@reduxjs/toolkit';

export const SearchInputVal = createSlice({
    name: 'searchInputVal',
    initialState: {
        inputVal : '',
        categoryVal : ''
    },
    reducers: {
        searchAction: (state, actions) => {
            state.inputVal = actions.payload.inputVal || '';
            state.categoryVal = actions.payload.categoryVal || '';
        },
        reSetAction: (state, actions) => {
            state.inputVal = actions.payload.inputVal || '';
            state.categoryVal = actions.payload.categoryVal || '';
        }
    }

});

export const { searchAction,reSetAction } = SearchInputVal.actions;

export default SearchInputVal.reducer;