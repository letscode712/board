//액션과 리듀서를 하나의 파일에서 관리함
//초기상태 만들고 리듀서도 관리해줌

import { createSlice } from '@reduxjs/toolkit';

export const SearchInputVal = createSlice({
    //redux- createSlice(): 리듀서 함수의 객체, 슬라이스 이름, state값 받고 action 생성함수와 action type으로 slice reducer를 자동 생성함
    //action과 reducer를 하나의 파일에서 관리 가능
    name: 'searchInputVal',
    initialState: { //초기상태도 만들어주고
        inputVal : '',
        categoryVal : ''
    },
    reducers: { //리듀서도 여기서 관리해줌
        searchAction: (state, actions) => { //테이블 조회 액션__payload: 액션객체에 같이 보내주는 것
            state.inputVal = actions.payload.inputVal || ''; //액션에서 보내준 대상 객체의 값 또는 ''값을 상태의 입력값으로 설정한다.
            state.categoryVal = actions.payload.categoryVal || ''; //액션에서 보내준 대상 객체의 값 또는 ''값을 상태의 카테고리 값으로 설정한다.
        },
        reSetAction: (state, actions) => { //테이블 초기화 액션
            state.inputVal = actions.payload.inputVal || '';
            state.categoryVal = actions.payload.categoryVal || '';
        }
    }

});

//입력값을 조회하는 액션객체들로 조회액션과 초기화액션을 설정해줌
export const { searchAction,reSetAction } = SearchInputVal.actions;

export default SearchInputVal.reducer;