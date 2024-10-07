// import React from 'react';
// import {useLocation, useNavigate} from 'react-router-dom';
// import {restCall} from "../util";
// import {FaChevronCircleLeft, FaMinusCircle} from "react-icons/fa";
//
// const DeleteBoard = () =>{
//     const navigate = useNavigate();
//     const {num} = useLocation().state; //삭제하는 게시글의 번호 받아옴
//
//     const handleDeleteClick = () => {
//         if(window.confirm("게시글을 삭제하시겠습니까?")){
//             restCall('DELETE', '/deleteBoard', {num:num}) //num을 동적으로 받아서 삭제 요청
//                 .then(response => {//삭제 성공하면
//                     alert('게시글 삭제 성공');
//                     navigate('/'); //메인 페이지로 이동
//                 })
//                 .catch(error =>{
//                     console.error('게시글 삭제 오류: ', error);
//                     alert('게시글 삭제 실패');
//                 });
//         }
//     };
//
//     const handleCancelClick = () =>{
//         navigate('/'); //메인 페이지로 이동함
//     }
//
//     return (
//         <div>
//             <p>게시글을 삭제하시겠습까?</p>
//             <button className={'btn'} onClick={handleDeleteClick}><FaMinusCircle/>삭제</button>
//             <button className={'btn'} onClick={handleCancelClick}><FaChevronCircleLeft/>취소</button>
//         </div>
//     );
// };
//
// export default DeleteBoard;