import React, {useEffect, useState} from "react";
import CommonTitle from "../components/common/CommonTitle";
import {restCall} from "../util";
import {useNavigate ,useLocation} from 'react-router-dom';
import BoardEditList from "../components/jobList/BoardEditList";

const EditBoard = (props) => {
    const [editList, setEditList] = useState( { list: [{num:'', writer:'', title:'', content:'', date:''}], cnt: 1 } );
    const navigate = useNavigate(); //페이지 이동에 사용하는 훅..두번째 인자로 데이터 전송가능함
    const location = useLocation(); //useNavigate로 전송한 데이터 받을 수 있다.
    const ClickNum = location.state.num;

    const handleInput = (e) => {

    }

    const handleEditClick = (e) => {
        restCall('POST', '/editBoard', editList.list).then(res => {
            if (window.confirm("게시글이 수정되었습니다.")) {
                navigate('/');
            }
        }).catch(e =>  console.log(e));
    }

    const handleBtnClick = (e) => {
        navigate("/");
    }

    useEffect(() => { //렌더링 할 때마다 특정 작업 수행
        restCall('GET', '/selectBoard', {num : ClickNum}).then(res => {
            setEditList({ list: res , cnt:1});
        }).catch(e =>  console.log(e));
    }, []);

    return (
        <React.Fragment>
            <CommonTitle titleName={'게시판 수정'}/>
            <BoardEditList list={editList.list} inputList={handleInput} />
            <button onClick={handleEditClick}>수정</button>
            <button onClick={handleBtnClick}>취소</button>
        </React.Fragment>
    );
}

export default EditBoard;