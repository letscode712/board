import React, {useState} from 'react';
import CommonTitle from "../components/common/CommonTitle";
import TableFormat from "../components/common/TableFormat";
import BoardEditList from "../components/jobList/BoardEditList";
import {restCall} from "../util";
import {useNavigate} from "react-router-dom";

const AddBoard = (props) => {
    const [ inputBoard, setInputBoard ] = useState( { list: [{num:'', writer:'', title:'', content:'', date:''}], cnt: 1 } );
    const navigate = useNavigate(); //useNavigate로 전송한 데이터 받는 훅

    const handleInput = (e) => {
        console.log(e);
        setInputBoard({list: e.list, cnt:1});
    }

    const handleAddBtnClick = (e) => {
        restCall('POST', '/addBoard', inputBoard.list[0]).then(res => {
            if (window.confirm("게시글이 등록되었습니다.")) {
                window.location.replace('/');
            }
        }).catch(e =>  console.log(e));
        // navigate('/');
    }

    return (
        <React.Fragment>
            <CommonTitle titleName={'게시판 등록'}/>
            <BoardEditList list={inputBoard.list} inputList={(value) => {
                handleInput(value)
            }}/>
            <button onClick={handleAddBtnClick}>등록</button>
        </React.Fragment>
    )
}

export default AddBoard;