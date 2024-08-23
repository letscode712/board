import React, {useEffect, useState} from "react";
import CommonTitle from "../components/common/CommonTitle";
import {restCall} from "../util";
import {useNavigate ,useLocation} from 'react-router-dom';
import TableFormat from "../components/common/TableFormat";
import BoardGetList from "../components/jobList/BoardGetList";

const ViewBoard = (props) => {
    const { list, cnt, clickAction } = props;
    const [viewBoardList, setViewBoardList] = useState({list: [],cnt: 1});
    const navigate = useNavigate();
    const location = useLocation();
    const clickNum = location.state.num;

    const handleBtnClick = (e) => {
        navigate("/");
    }


    const handleEditClick = (e) => {
        navigate("/editBoard", {state:{num: clickNum}});
    }

    const handleDeleteClick = (e) => {
        restCall('GET', '/deleteBoard', {num: clickNum}).then(res => {
            if (window.confirm("게시글이 삭제되었습니다.")) {
                navigate("/")
            } else {
                alert("게시글 삭제에 실패하였습니다.")
            }
        }).catch(e =>  console.log(e));
    }

    useEffect(() => {
        restCall('GET', '/selectBoard', {num: clickNum}).then(res => {
            setViewBoardList({list: res, cnt:1});
        }).catch(e =>  console.log(e));
    }, []);

    return (
        <React.Fragment>
            <CommonTitle titleName={'게시판 상세보기'}/>
            <BoardGetList list={viewBoardList.list} cnt={1} />
            <button onClick={handleBtnClick}>목록</button>
            <button onClick={handleEditClick}>수정</button>
            <button onClick={handleDeleteClick}>삭제</button>
        </React.Fragment>
    )
}

export default ViewBoard;