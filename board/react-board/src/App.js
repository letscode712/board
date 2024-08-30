import React from "react";
import {Route, Routes} from "react-router-dom"; //라우팅으로 페이지 이동할 수 있게 경로 지정해줌
import ListBoard from "./pages/ListBoard"; //
import AddBoard from "./pages/AddBoard";
import ViewBoard from "./pages/ViewBoard";
import EditBoard from "./pages/EditBoard";

function App() {

  return (
      <React.Fragment>
        <Routes>
            <Route path="/" element={<ListBoard />}/>
            <Route path="/selectBoard" element={<ListBoard/>}/>
            <Route path="/addBoard" element={<AddBoard />}/>
            <Route path="/viewBoard" element={<ViewBoard />}/>
            <Route path="/editBoard" element={<EditBoard />}/>
        </Routes>
      </React.Fragment>
  );
}

export default App;
