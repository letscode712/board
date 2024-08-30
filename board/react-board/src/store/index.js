import { configureStore } from '@reduxjs/toolkit'; //redux store를 생성함. store는 애플리케이션의 전역 상태를 관리하는 객체..여러 리듀서를 결합해서 상태관리
import SearchInputVal from "../reducer/SearchInputVal";

export default configureStore({ //스토어를 내보내서 애플리케이션 전체에 사용함
    reducer: {
        SearchInputVal: SearchInputVal //SearchInputVal.js에서 생성한 슬라이스의 리듀서 설정함.  -> SearchInputVal의 상태를 관리함.
    },
});