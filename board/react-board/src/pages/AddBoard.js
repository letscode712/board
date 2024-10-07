// import CommonTitle from "../components/common/CommonTitle";
// import {restCall} from "../util";
// import {useState} from "react";
// import BoardEditList from "../components/jobList/BoardEditList";
// import {FaPlusCircle} from "react-icons/fa";
// import {useNavigate} from "react-router-dom";
//
// const AddBoard = (props) => {
//     const {onClose, onAddSuccess} = props;
//     const [inputBoard, setInputBoard] = useState({list: [{num: '', writer: '', title: '', content: '', date: ''}], cnt: 1});
//     const navigate = useNavigate();
//
//     //입력값 변경 핸들러
//     const handleInput = (e) => {
//         const {name, value} = e.target;
//         setInputBoard((prevState) => ({
//             list: [{...prevState.list[0], [name]:value}],
//             cnt:1
//         }));
//     };
//
//     //등록 버튼 클릭 시 호출
//     const handleAddBtnClick = () => {
//         restCall('POST', '/addBoard', inputBoard.list[0])
//             .then(res => {
//                 alert('게시글이 등록되었습니다.');
//                 onAddSuccess(); //등록 성공 시 메인 페이지 리스트 갱신 함수 호출
//                 onClose(); //모달 닫음
//                 navigate('/');
//             })
//             .catch(error => {
//                 console.error('게시글 등록 오류:', error);
//                 alert('게시글 등록에 실패했습니다.');
//             });
//     };
//
//     return (
//         <div>
//             <CommonTitle titleName={'게시판 등록'}/>
//             <BoardEditList list={inputBoard.list} inputList={handleInput}/>
//             <button className={'btn'} onClick={handleAddBtnClick}><FaPlusCircle/>등록</button>
//         </div>
//     );
// };
//
// export default AddBoard;
//
//
//기존의 (모달창 없이) 페이지 이동 코드
// import React, {useState} from 'react';
// import CommonTitle from "../components/common/CommonTitle";
// //import TableFormat from "../components/common/TableFormat";
// import BoardEditList from "../components/jobList/BoardEditList";
// import {restCall} from "../util";
// import {useNavigate} from "react-router-dom";
// import {FaChevronCircleLeft, FaPlusCircle} from "react-icons/fa";
// //import listBoard from "./ListBoard";
//
// const AddBoard = (props) => {
//     const [ inputBoard, setInputBoard ] = useState( { list: [{num:'', writer:'', title:'', content:'', date:''}], cnt: 1 } );
//     const navigate = useNavigate(); //useNavigate로 전송한 데이터 받는 훅
//
//     console.log('기존의 inputBoard.list:', inputBoard.list); //e와 같음
//
//     //BoardEditList.js 에서 입력 값이 변경될 때마다 전달 받은 데이터 처리하여 상태 업데이트하는 방식으로 작성함.
//     const handleInput = (e) => {
//         console.log('Input event:', e); //e: Array(1)
//
//         //상태 업데이트
//         setInputBoard({list: e, cnt:1});
//
//         console.log('After Input event(Suggested): ', inputBoard);//{list: Array(1), cnt:1}이고, Array(1)에 list[0] 값이 들어옴
//         console.log('Updated inputBoard:', inputBoard.list[0]); //곧바로 list[0]의 값들이 출력됨..값 확인용
//     };
//
//     //등록 버튼 누르면 호출됨
//     const handleAddBtnClick = (e) => {
//         console.log('Submitting inputBoard:', inputBoard.list[0]); //입력된 값 확인
//
//         restCall('POST', '/addBoard', inputBoard.list[0])
//             .then(res => { //데이터 등록 시에는 post
//                     if (window.confirm("게시글이 등록되었습니다.")) {
//                         navigate('/'); //메인 페이지로 이동
//                     }
//             }).catch(error =>{
//                 console.error('게시글 추가 오류: ', error);
//                 alert('게시글 추가 실패');
//             });
//     };
//
//
//
//
//     //취소 버튼
//     const handleCancelBtnClick=(e)=>{
//         navigate('/');
//     }
//
//     return (
//         <React.Fragment>
//             <CommonTitle titleName={'게시판 등록'}/>
//             <BoardEditList list={inputBoard.list} inputList={handleInput}/>
//             <button className={'btn'} onClick={handleAddBtnClick}><FaPlusCircle/>등록</button>
//             <button className={'btn'} onClick={handleCancelBtnClick}><FaChevronCircleLeft/>취소</button>
//         </React.Fragment>
//     )
// }
//
// export default AddBoard;