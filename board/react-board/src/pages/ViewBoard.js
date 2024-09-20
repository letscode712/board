import React, {useEffect, useState} from "react";
import CommonTitle from "../components/common/CommonTitle";
import {restCall} from "../util";
import {useNavigate ,useLocation} from 'react-router-dom';
import BoardGetList from "../components/jobList/BoardGetList";
import {FaList, FaMinusCircle, FaPen} from "react-icons/fa";

const ViewBoard = (props) => {
    const { list, cnt, clickAction } = props;
    const [viewBoardList, setViewBoardList] = useState({list: [],cnt: 1});
    const navigate = useNavigate();
    const location = useLocation();
    const clickNum = location.state.num;

    //목록 버튼
    const handleBtnClick = (e) => {
        navigate("/");
    }

    //수정 버튼
    const handleEditClick = (e) => {
        navigate("/editBoard", {state:{num: clickNum}});
    }

    //삭제 버튼
    const handleDeleteClick = (e) => {
        restCall('GET', '/deleteBoard', {num: clickNum}).then(res => {
            if (window.confirm("게시글이 삭제되었습니다.")) {
                navigate("/")
            } else {
                alert("게시글 삭제에 실패하였습니다.")
            }
        }).catch(e =>  {
            console.error(e);
            alert("게시글 삭제 오류 발생");
        });
    }

    useEffect(() => { //렌더링 될 때마다 특정 작업 수행
        restCall('GET', '/selectBoard', {num: clickNum}).then(res => {
            setViewBoardList({list: res, cnt:1});
        }).catch(e =>  console.log(e));
    }, []);

    return (
        <React.Fragment>
            <CommonTitle titleName={'게시판 상세보기'}/>
            <BoardGetList list={viewBoardList.list} cnt={1} />
            <div>

                <button className={'btn'} onClick={handleBtnClick}><FaList/>목록</button>
                <button className={'btn'} onClick={handleEditClick}><FaPen/>수정</button>
                <button className={'btn'} onClick={handleDeleteClick}><FaMinusCircle/>삭제</button>
            </div>
        </React.Fragment>
    );
}

export default ViewBoard;