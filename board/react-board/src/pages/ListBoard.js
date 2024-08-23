import React, {useEffect, useRef, useState} from "react";
import CommonTitle from "../components/common/CommonTitle";
import BoardGetList from "../components/jobList/BoardGetList";
import {restCall} from "../util";
import {useDispatch, useSelector} from "react-redux";
import { useNavigate } from 'react-router-dom';
import {reSetAction, searchAction} from "../reducer/SearchInputVal";

const ListBoard = (props) => {
    const { clickAction } = props;
    const [boardList, setBoardList] = useState({list: [], cnt:0});
    const [searchInfo, setSearchInfo] = useState({category: '',inputVal: ''});
    let clickTr  = '';

    const navigate = useNavigate();
    const dispatch =  useDispatch();
    const inputState = useSelector((state) => state.SearchInputVal);
    const inputRef = useRef(null);
    const selectRef = useRef(null);

    const handleTdClick = (target) => {
        navigate("/viewBoard", {state:{num : target.num}});
    }

    const handleSearchBtn = (e) => {
        if (inputRef.current !== undefined && selectRef.current !== undefined) {
            setSearchInfo({category: selectRef.current.value, inputVal: inputRef.current.value})
            dispatch(searchAction({inputVal : inputRef.current.value, categoryVal : selectRef.current.value} ));
        }
    }

    const getList = () => {
        restCall('GET', '/selectBoard', {category :selectRef.current.value, inputVal: inputRef.current.value}).then(res => {
            setBoardList({ list: res, cnt: res.length });
        }).catch(e =>  console.log(e));
    }

    const handleClearBtn = (e) => {
        setSearchInfo({category:'', inputVal: ''})
        dispatch(reSetAction({}));
    }

    const handleAddClick = () => {
        navigate('/addBoard');
    }

    useEffect(() => {
        inputRef.current.value = inputState.inputVal;
        selectRef.current.value = inputState.categoryVal;
        getList();
    }, [searchInfo]);


    return (
        <React.Fragment>
            <CommonTitle titleName={'게시판 목록'}/>
            <select ref={selectRef} >
                <option key="option" value="" disabled selected>조회항목을 선택하세요</option>
                <option key="num" value="num">num</option>
                <option key="writer" value="writer">writer</option>
                <option key="title" value="title">title</option>
            </select>
            <input type="text" ref={inputRef}/>
            <button className={'btn'} onClick={handleSearchBtn}>조회</button>
            <button className={'btn'} onClick={handleClearBtn}>초기화</button>
            <button className={'btn'} onClick={handleAddClick}>등록</button>
            <BoardGetList list={boardList.list} cnt={boardList.cnt}  clickAction={handleTdClick}/>
        </React.Fragment>
    )
}

export default ListBoard;