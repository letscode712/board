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

    const navigate = useNavigate(); //페이지 이동 및 데이터 전송 훅
    const dispatch =  useDispatch(); //action 발생하는 함수
    const inputState = useSelector((state) => state.SearchInputVal);
    const inputRef = useRef(null); //객체 안의 값이 실제 엘리먼트를 가리킴
    const selectRef = useRef(null); //객체 안의 값이 실제 엘리먼트를 가리킴

    const handleTdClick = (target) => {
        navigate("/viewBoard", {state:{num : target.num}}); //viewBoard 페이지로 이동하면서, 상태를 객체의 num값으로 한 파라미터를 전송함
    }

    const handleSearchBtn = (e) => { //조회버튼 누르면 호출됨
        if (inputRef.current !== undefined && selectRef.current !== undefined) { //입력의 현재와 선택의 현재값이 null이 아니라면
            setSearchInfo({category: selectRef.current.value, inputVal: inputRef.current.value}) //카테고리는 현재 내가 선택한 값을, 입력값은 현재 작성한 값을 설정해준 것을 찾도록 한다.
            dispatch(searchAction({inputVal : inputRef.current.value, categoryVal : selectRef.current.value} )); //조회한 것을 action으로 설정해서 발생시킴
        }
    }

    const getList = () => { //조회한 것을 리스트로 받아옴
        restCall('GET', '/selectBoard', {category :selectRef.current.value, inputVal: inputRef.current.value}).then(res => {
            setBoardList({ list: res, cnt: res.length });
        }).catch(e =>  console.log(e));
    }

    const handleClearBtn = (e) => { //초기화 버튼
        setSearchInfo({category:'', inputVal: ''}) //테이블의 값을 초기화해줌
        dispatch(reSetAction({})); //액션도 리셋해줌
    }

    const handleAddClick = () => { //등록 버튼누르면 호출됨
        navigate('/addBoard'); //해당 페이지로 이동됨.
    }

    useEffect(() => { //렌더링 될때마다 액션 수행됨
        inputRef.current.value = inputState.inputVal;
        selectRef.current.value = inputState.categoryVal;
        getList(); //리스트 받아오고
    }, [searchInfo]); //정보조회 배열로 검사함


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