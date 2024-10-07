import React, {useEffect, useRef, useState} from "react";
import CommonTitle from "../components/common/CommonTitle";
import {restCall} from "../util";
import {useNavigate ,useLocation} from 'react-router-dom';
import BoardGetList from "../components/jobList/BoardGetList";
import {FaChevronCircleLeft, FaList, FaMinusCircle, FaPen, FaRegCommentDots} from "react-icons/fa";
import BoardEditList from "../components/jobList/BoardEditList";

const ViewBoard = (props) => {
    const { list, cnt, clickAction } = props;
    const location = useLocation();
    const listA = location.state.list;
    const [viewBoardList, setViewBoardList] = useState({list: [listA],cnt: 1});
    const [editList, setEditList] = useState( { list: [{num:listA.num, writer:listA.writer, title:listA.title, content:listA.content, date:listA.date}], cnt: 1 } );
    const navigate = useNavigate();
    // const clickNum = location.state;
    // console.log(clickNum)

    //게시글 수정을 누르면 나타나는 모달창
    const [modalOpen, setModalOpen] = useState(false); //모달창 표시 여부
    const modalBackground = useRef(); //모달창 바깥을 누르면 모달창이 닫히도록 만듦.

    //목록 버튼
    const handleBtnClick = (e) => {
        navigate("/");
    }

    //수정 버튼 -> 이제 모달창을 구현할 것.
    // const handleEditClick = (e) => {
    //     navigate("/editBoard", { state: { num: listA.num } });
    // }

    const handleInput = (value) => {
        // console.log('before editInput:', value); // 수정하려고 입력한 값 출력

        setEditList((prevState) => ({
            ...prevState, list: value
        }));

        // console.log('updated editList after setEditList:', editList);
    };


    //수정버튼 누르면 호출됨
    const handleEditClick = (e) => {
        // console.log('restCall 호출');
        // console.log('current editList:',editList.list[0]);

        restCall('POST', '/post', editList.list[0]) //path를 '/editBoard'가 아니라 '/post'로 바꿔서 백단으로 넘어가게 함.
            .then(res => {
                console.log('then editList:',editList.list[0]); //editList가 변경된 값으로 출력되기는 함.
                console.log("res message: ", res) //여기서 보니까 res가 빈칸이다. 여전히 초기화되는 것 같음
                if (res.stauts === 'OK') { //res.ok
                    alert('게시글이 수정되었습니다.');
                    setModalOpen(false); //모달창 닫기
                    navigate('/');
                }
            })
            .catch(error => {
                console.error('게시글 수정 오류:', error);
                alert('게시글 수정에 실패했습니다.');
            });
    }

    //삭제 버튼
    const handleDeleteClick = (e) => {
        restCall('GET', '/deleteBoard', {num: listA.num}).then(res => {
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

    //리뷰페이지로 이동
    const handleReviewBtnClick = () =>{
        navigate("/viewReview");
    }

    // useEffect(() => { //렌더링 될 때마다 특정 작업 수행
    //     restCall('GET', '/selectBoard', {num: clickNum}).then(res => {
    //         setViewBoardList({list: res, cnt:1});
    //     }).catch(e =>  console.log(e));
    // }, []);

    return (
        <React.Fragment>
            <CommonTitle titleName={'게시판 상세보기'}/>
            <BoardGetList list={viewBoardList.list} cnt={1} />
            <div>
                <button className={'btn'} onClick={handleBtnClick}><FaList/>목록</button>
                <button className={'btn'} onClick={()=>setModalOpen(true)}><FaPen/>수정</button>
                {modalOpen &&
                    <div className={'modal-container'} ref={modalBackground} onClick={e=>{
                        if(e.target === modalBackground.current) {
                            setModalOpen(false);
                        }
                    }}>
                        <div className={'modal-content'}>
                            <CommonTitle titleName={'게시판 수정'}/>
                            <BoardEditList list={editList.list} inputList={handleInput} />
                            <button className={'btn'} onClick={handleEditClick}><FaPen/>수정</button>
                            <button className={'btn'} onClick={handleBtnClick}><FaChevronCircleLeft/>취소</button>
                        </div>
                    </div>
                }
                <button className={'btn'} onClick={handleDeleteClick}><FaMinusCircle/>삭제</button>
                <button className={'btn'} onClick={handleReviewBtnClick}><FaRegCommentDots />리뷰</button>
            </div>
        </React.Fragment>
    );
}

export default ViewBoard;


//수정 버튼 누르면 따로 수정 페이지로 이동되던 코드
// import React, {useEffect, useState} from "react";
// import CommonTitle from "../components/common/CommonTitle";
// import {restCall} from "../util";
// import {useNavigate ,useLocation} from 'react-router-dom';
// import BoardGetList from "../components/jobList/BoardGetList";
// import {FaList, FaMinusCircle, FaPen} from "react-icons/fa";
//
// const ViewBoard = (props) => {
//     const { list, cnt, clickAction } = props;
//     const location = useLocation();
//     const listA = location.state.list;
//     const [viewBoardList, setViewBoardList] = useState({list: [listA],cnt: 1});
//     const navigate = useNavigate();
//     // const clickNum = location.state;
//     // console.log(clickNum)
//
//     //목록 버튼
//     const handleBtnClick = (e) => {
//         navigate("/");
//     }
//
//     //수정 버튼
//     const handleEditClick = (e) => {
//         navigate("/editBoard", { state: { num: listA.num } });
//     }
//
//     //삭제 버튼
//     const handleDeleteClick = (e) => {
//         restCall('GET', '/deleteBoard', {num: listA.num}).then(res => {
//             if (window.confirm("게시글이 삭제되었습니다.")) {
//                 navigate("/")
//             } else {
//                 alert("게시글 삭제에 실패하였습니다.")
//             }
//         }).catch(e =>  {
//             console.error(e);
//             alert("게시글 삭제 오류 발생");
//         });
//     }
//
//     // useEffect(() => { //렌더링 될 때마다 특정 작업 수행
//     //     restCall('GET', '/selectBoard', {num: clickNum}).then(res => {
//     //         setViewBoardList({list: res, cnt:1});
//     //     }).catch(e =>  console.log(e));
//     // }, []);
//
//     return (
//         <React.Fragment>
//             <CommonTitle titleName={'게시판 상세보기'}/>
//             <BoardGetList list={viewBoardList.list} cnt={1} />
//             <div>
//                 <button className={'btn'} onClick={handleBtnClick}><FaList/>목록</button>
//                 <button className={'btn'} onClick={handleEditClick}><FaPen/>수정</button>
//                 <button className={'btn'} onClick={handleDeleteClick}><FaMinusCircle/>삭제</button>
//             </div>
//         </React.Fragment>
//     );
// }
//
// export default ViewBoard;