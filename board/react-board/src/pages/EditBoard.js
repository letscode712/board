// //수정페이지로 이동해서 처리하던 코드
// import React, {useEffect, useState} from "react";
// import CommonTitle from "../components/common/CommonTitle";
// import {restCall} from "../util";
// import {useNavigate ,useLocation} from 'react-router-dom';
// import {FaChevronCircleLeft, FaPen} from "react-icons/fa";
// //import BoardGetList from "../components/jobList/BoardGetList";
// import BoardEditList from "../components/jobList/BoardEditList";
//
// const EditBoard = (props) => {
//     const navigate = useNavigate(); //페이지 이동에 사용하는 훅..두번째 인자로 데이터 전송가능함
//     const location = useLocation(); //useNavigate로 전송한 데이터 받을 수 있다.
//     const listA = location.state;
//     const [editList, setEditList] = useState( { list: [{num:listA.num, writer:listA.writer, title:listA.title, content:listA.content, date:listA.date}], cnt: 1 } );
//     //비구조화 할당으로 처리할 경우
//     // const {num, writer, title, content, date} = location.state;
//     // const [editList, setEditList] = useState({list: [num, writer, title, content, date]})
//
//     const handleInput = (value) => {
//         // console.log('before editInput:', value); // 수정하려고 입력한 값 출력
//
//         setEditList((prevState) => ({
//             ...prevState, list: value
//         }));
//
//         // console.log('updated editList after setEditList:', editList);
//     };
//
//     const handleEditClick = (e) => {
//         // console.log('restCall 호출');
//         // console.log('current editList:',editList.list[0]);
//
//         restCall('POST', '/post', editList.list[0]) //path를 '/editBoard'가 아니라 '/post'로 바꿔서 백단으로 넘어가게 함.
//             .then(res => {
//                 // console.log('then editList:',editList.list[0]); //editList가 변경된 값으로 출력되기는 함.
//                 console.log("res message: ", res) //여기서 보니까 res가 빈칸이다. 여전히 초기화되는 것 같음
//                 if (res.stauts === 'OK') { //res.ok
//                     window.confirm('게시글이 수정되었습니다.');
//                     navigate('/');
//                 }
//             })
//             .catch(e => {
//                 // console.error('catch 블록 실행:', e);
//             });
//     }
//
//     const handleBtnClick = (e) => {
//         navigate("/");
//     }
//
//     useEffect(() => { //렌더링 할 때마다 특정 작업 수행
//         restCall('GET', '/selectBoard', {num : listA.num})
//             .then(res => {
//                 if(Array.isArray(res)){ //res가 배열인지 확인해서
//                     setEditList({ list: res , cnt:1}); //setEditList에 수정 이전 listA 설정해줌
//                 }
//             }).catch(e =>  console.log(e));
//     }, []);
//
//     return (
//         <React.Fragment>
//             <CommonTitle titleName={'게시판 수정'}/>
//             <BoardEditList list={editList.list} inputList={handleInput} />
//             <button className={'btn'} onClick={handleEditClick}><FaPen/>수정</button>
//             <button className={'btn'} onClick={handleBtnClick}><FaChevronCircleLeft/>돌아가기</button>
//         </React.Fragment>
//     );
// }
//
// export default EditBoard;