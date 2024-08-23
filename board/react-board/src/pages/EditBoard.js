import React, {useEffect, useState} from "react";
import CommonTitle from "../components/common/CommonTitle";
import {restCall} from "../util";
import {useNavigate ,useLocation} from 'react-router-dom';
import BoardEditList from "../components/jobList/BoardEditList";

const EditBoard = (props) => {
    const [editList, setEditList] = useState( { list: [{num:'', writer:'', title:'', content:'', date:''}], cnt: 1 } );
    const navigate = useNavigate();
    const location = useLocation();
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

    useEffect(() => {
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
    )
}

export default EditBoard;