//react 프로젝트의 주요 컴포넌트
//웹 앱의 레이아웃 및 구조를 정의함
//다른 컴포넌트를 렌더링하거나 라우팅을 설정하는 역할

import React from "react";
import {Route, Routes} from "react-router-dom"; //라우팅으로 페이지 이동할 수 있게 경로 지정해줌
import ListBoard from "./pages/ListBoard"; //
import AddBoard from "./pages/AddBoard";
import ViewBoard from "./pages/ViewBoard";
import EditBoard from "./pages/EditBoard";
import ViewReview from "./pages/Review/ViewReview";
import AddReview from "./pages/Review/AddReview";
import EditReviewList from "./components/jobList/EditReviewList";

function App() {

  return (
      <React.Fragment>
        <Routes>
            <Route path="/" element={<ListBoard />}/>
            <Route path="/selectBoard" element={<ListBoard/>}/>
            <Route path="/addBoard" element={<AddBoard />}/>
            <Route path="/viewBoard" element={<ViewBoard />}/>
            <Route path="/editBoard" element={<EditBoard />}/>
            <Route path="/viewReview" element={<ViewReview/>} />
            <Route path="/addReview" element={<AddReview/>} />
            <Route path="/editReview" element={<EditReviewList/>}/>
        </Routes>
      </React.Fragment>
  );
}

export default App;
