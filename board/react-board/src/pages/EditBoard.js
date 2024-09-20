import React, {useEffect, useState} from "react";
import CommonTitle from "../components/common/CommonTitle";
import {restCall} from "../util";
import {useNavigate ,useLocation} from 'react-router-dom';
import BoardEditList from "../components/jobList/BoardEditList";
import {FaChevronCircleLeft, FaPen} from "react-icons/fa";

const EditBoard = (props) => {
    const [editList, setEditList] =
        useState( { list: [{num:'', writer:'', title:'', content:'', date:''}], cnt: 1 } );
    const navigate = useNavigate(); //페이지 이동에 사용하는 훅..두번째 인자로 데이터 전송가능함
    const location = useLocation(); //useNavigate로 전송한 데이터 받을 수 있다.
    const ClickNum = location.state.num;

    const handleInput = (value) => {
        setEditList((prevState) => ({
            ...prevState,
            list: [value]
        }));
        console.log('update editList: ', value);
        console.log('full editList: ', editList);
    }

    //29line: POST 500 ITERNAL SERVER ERROR 발생 -> 바로 catch문 실행됨
    const handleEditClick = (e) => {
        console.log('restCall 호출');
        console.log('just check editList:',editList.list[0]);

        restCall('POST', '/editBoard', editList.list[0])
            .then(res => {
                console.log('then 블록 실행');
                console.log('then editList:',editList.list[0]);
                if (res.ok) {
                    navigate('/');
                }
            })
            .catch(e => {
                console.error('catch 블록 실행:', e);
                console.log('catch error editList:',editList.list[0]);
            });
    }

    const handleBtnClick = (e) => {
        navigate("/");
    }

    useEffect(() => { //렌더링 할 때마다 특정 작업 수행
        restCall('GET', '/selectBoard', {num : ClickNum})
            .then(res => {
                if(Array.isArray(res)){ //res가 배열인지 확인해서
                    setEditList({ list: res , cnt:1}); //setEditList에 데이터를 형식대로 넣어줌
                }
            }).catch(e =>  console.log(e));
    }, []);

    return (
        <React.Fragment>
            <CommonTitle titleName={'게시판 수정'}/>
            <BoardEditList list={editList.list} inputList={handleInput} />
            <button className={'btn'} onClick={handleEditClick}><FaPen/>수정</button>
            <button className={'btn'} onClick={handleBtnClick}><FaChevronCircleLeft/>취소</button>
        </React.Fragment>
    );
}

export default EditBoard;