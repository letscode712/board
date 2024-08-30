import { createSlice } from '@reduxjs/toolkit';

export const SearchInputVal = createSlice({
    name: 'searchInputVal',
    initialState: {
        inputVal : '',
        categoryVal : ''
    },
    reducers: {
        searchAction: (state, actions) => { //상태와 액션객체를 전달받아 테이블을 조회하는 액션__payload: 무엇을 액션객체에 같이 보내주는 것
            state.inputVal = actions.payload.inputVal || ''; //액션에서 보내준 대상 객체의 값 또는 ''값을 상태의 입력값으로 설정한다.
            state.categoryVal = actions.payload.categoryVal || ''; //액션에서 보내준 대상 객체의 값 또는 ''값을 상태의 카테고리 값으로 설정한다.
        },
        reSetAction: (state, actions) => { //상태와 액션객체를 전달받아 테이블을 초기화하는 액션
            state.inputVal = actions.payload.inputVal || '';
            state.categoryVal = actions.payload.categoryVal || '';
        }
    }

});

//입력값을 조회하는 액션객체들로 조회액션과 초기화액션을 설정해줌
export const { searchAction,reSetAction } = SearchInputVal.actions;

export default SearchInputVal.reducer;