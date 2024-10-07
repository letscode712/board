//초기화면 ListBoard.js 이자, 테이블 조회하면 나오는 selectBoard.js 이다.
import React, {useEffect, useRef, useState} from "react";
import CommonTitle from "../components/common/CommonTitle";
import BoardGetList from "../components/jobList/BoardGetList";
import {restCall} from "../util";
import {useDispatch, useSelector} from "react-redux";
import { useNavigate } from 'react-router-dom';
import {reSetAction, searchAction} from "../reducer/SearchInputVal";
import {FaRedo, FaSistrix, FaPlusCircle, FaChevronCircleLeft} from 'react-icons/fa';
import BoardEditList from "../components/jobList/BoardEditList";

const ListBoard = (props) => {
    const { clickAction } = props;
    const [boardList, setBoardList] = useState({list: [], cnt:0});
    const [searchInfo, setSearchInfo] = useState({category: '',inputVal: ''});
    const [ inputBoard, setInputBoard ] = useState( { list: [{num:'', writer:'', title:'', content:'', date:''}], cnt: 1 } );

    //게시글 등록을 누르면 나타나는 모달창
    const [modalOpen, setModalOpen] = useState(false); //모달 표시 여부 저장
    const modalBackground = useRef(); //모달창 바깥을 누르면 모달창이 닫히도록 만듦.

    const navigate = useNavigate(); //페이지 이동 및 데이터 전송 훅
    const dispatch =  useDispatch(); //action 발생하는 함수
    const inputState = useSelector((state) => state.SearchInputVal);
    const inputRef = useRef(null); //객체 안의 값이 실제 엘리먼트를 가리킴
    const selectRef = useRef(null); //객체 안의 값이 실제 엘리먼트를 가리킴

    const handleTdClick = (target) => {
        navigate("/viewBoard", {state:{list : target}}); //viewBoard 페이지로 이동하면서, 상태를 객체의 num값으로 한 파라미터를 전송함
    }

    const handleSearchBtn = (e) => { //조회버튼 누르면 호출됨
        if (inputRef.current !== undefined && selectRef.current !== undefined) {
            setSearchInfo({category: selectRef.current.value, inputVal: inputRef.current.value}) //카테고리는 현재 내가 선택한 값을, 입력값은 현재 작성한 값을 설정해준 것을 찾도록 한다.
            dispatch(searchAction({inputVal : inputRef.current.value, categoryVal : selectRef.current.value} )); //조회한 것을 action으로 설정해서 발생시킴
        }
    }

    //리스트 갱신 함수
    const getList = () => { //조회한 것을 리스트로 받아옴 (GET요청)
        restCall('GET', '/selectBoard', {category :selectRef.current.value, inputVal: inputRef.current.value})
            .then(res => {
                setBoardList({ list: res, cnt: res.length });
            }).catch(e =>  {
            console.log(e);
            //alert("게시글 불러오는 중 오류 발생");
        });
    }

    //초기화 버튼
    const handleClearBtn = (e) => {
        setSearchInfo({category:'', inputVal: ''}) //테이블의 값을 초기화해줌
        dispatch(reSetAction({})); //액션도 리셋해줌
    }

    // const handleAddClick = () => { //등록 버튼누르면 호출됨...이제 모달창으로 구현할 것.
    //     navigate('/addBoard'); //해당 페이지로 이동됨.
    // }
    // console.log('기존의 inputBoard.list:', inputBoard.list); //e와 같음

    //입력값 변경하는 함수: BoardEditList.js 에서 입력 값이 변경될 때마다 전달 받은 데이터 처리하여 상태 업데이트하는 방식으로 작성함.
    const handleInput = (e) => {
        // console.log('Input event:', e); //e: Array(1)

        //상태 업데이트
        setInputBoard({list: e, cnt:1});

        console.log('After Input event(Suggested): ', inputBoard);//{list: Array(1), cnt:1}이고, Array(1)에 list[0] 값이 들어옴
        console.log('Updated inputBoard:', inputBoard.list[0]); //곧바로 list[0]의 값들이 출력됨..값 확인용
    };

    //등록 버튼 누르면 호출됨
    const handleAddBtnClick = (e) => {
        // console.log('Submitting inputBoard:', inputBoard.list[0]); //입력된 값 확인

        restCall('POST', '/addBoard', inputBoard.list[0])
            .then(res => { //데이터 등록 시에는 post
                alert("게시글이 등록되었습니다.");
                setModalOpen(false); //모달창 닫기
                getList(); //리스트 갱신
            }).catch(error =>{
            console.error('게시글 추가 오류: ', error);
            alert('게시글 추가 실패');
        });
    };

    useEffect(() => {//searchInfo가 바뀌면 리렌더링 됨
        inputRef.current.value = inputState.inputVal;
        selectRef.current.value = inputState.categoryVal;
        getList(); //리스트 받아오고
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
            <input type="text" size={50} placeholder="검색어를 입력하세요.." ref={inputRef}/>
            <button className={'btnHome'} onClick={handleSearchBtn}><FaSistrix/>조회</button>
            <button className={'btnHome'} onClick={handleClearBtn}><FaRedo/>초기화</button>
            <BoardGetList list={boardList.list} cnt={boardList.cnt}  clickAction={handleTdClick}/>
            <button className={'btnHome'} onClick={()=>setModalOpen(true)}><FaPlusCircle/>게시글 등록</button>
            {modalOpen &&
                <div className={'modal-container'} ref={modalBackground} onClick={e=>{
                    if(e.target === modalBackground.current) {
                        setModalOpen(false);
                    }
                }}>
                    <div className={'modal-content'}>
                        <CommonTitle titleName={'게시판 등록'}/>
                        <BoardEditList list={inputBoard.list} inputList={handleInput}/>
                        <button className={'btn'} onClick={handleAddBtnClick}><FaPlusCircle/>등록</button>
                        <button className={'btn'} onClick={()=>setModalOpen(false)&&navigate('/')}><FaChevronCircleLeft/>취소</button>
                    </div>
                </div>
            }
        </React.Fragment>
    );
}

export default ListBoard;