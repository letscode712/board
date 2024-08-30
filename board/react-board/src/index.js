//리액트 프로젝트의 진입점. app 컴포넌트를 dom화면에 렌더링하며, 리덕스를 사용하기 때문에 리덕스 provider 설정도 포함됨.
import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import './components/css/common.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, HashRouter} from "react-router-dom";
import { Provider } from 'react-redux'
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
