//리액트 프로젝트의 진입점. app 컴포넌트를 dom화면에 렌더링하며, 리덕스를 사용하기 때문에 리덕스 provider 설정도 포함됨.
import React from 'react';
import ReactDOM from 'react-dom/client';
import './components/css/common.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//HashRouter: URL의 해쉬값을 사용해서 페이지를 관리함.
//브라우저에서 URL의 해쉬값이 변경되면 HashRouter는 해당 경로와 일치하는 컴포넌트를 렌더링한다.
//페이지를 새로고침 하지 않아도 컴포넌트가 변경됨
import {HashRouter} from "react-router-dom";
import { Provider } from 'react-redux'  //Provider로 스토어 연결해줌
import store from './store'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <HashRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </HashRouter>
);

reportWebVitals();
