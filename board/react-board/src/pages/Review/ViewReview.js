import React, {useEffect, useState} from 'react';
import CommonTitle from "../../components/common/CommonTitle";
import GetReviewList from "../../components/jobList/GetReviewList";
import {useLocation, useNavigate} from "react-router-dom";
import {FaChevronCircleLeft, FaMinusCircle, FaPlusCircle} from "react-icons/fa";
import {restCall} from "../../util";

const ViewReview = (props) =>{
    const [inputReview, setInputReview] = useState({review: [], cnt: 1});
    const navigate = useNavigate();
    const location = useLocation();
    const reviewA = location.state; //선택한 리뷰의 num을 변수로 선언함
    const postNum = location.state.postNum;

    //postNum이 존재할때만 리뷰 데이터 가져옴
    useEffect(() => {
        if(postNum){
            restCall('GET', '/getReview', {postNum: postNum})
                .then(response => {
                    setInputReview({review: response, cnt: response.length});
                }).catch(error=>{
                    console.error('리뷰 데이터 get하는 도중에 오류 발생: ', error);
                });
        }
    }, [postNum]);

    //등록 버튼 누르면 리뷰 등록 페이지로 이동
    const handleAddBtnClick = (e)=>{
        navigate('/addReview', { state: { postNum: postNum } });
    }

    //수정 버튼 누르면 리뷰 수정 페이지로 이동
    const handleEditBtnClick =(e)=>{
        navigate('/editReview', { state: { postNum: postNum } });
    }

    //삭제 버튼
    const handleDeleteBtnClick = (e) => {
        restCall('GET', '/deleteReview', {reviewNum: reviewA.num})
            .then(res =>{
                if(window.confirm("리뷰가 삭제되었습니다.")){
                    navigate(-1);
                }else{
                    alert("리뷰 삭제에 실패하였습니다.");
                }
            }).catch(e =>{
                console.error('리뷰 삭제 실패 오류:', e);
            });
    }

    //취소 버튼 누르면 앞페이지(ViewBoard-게시판 상세 보기)로 이동됨.
    const handleCancelBtnClick = (e) =>{
        navigate(-1);
    }

    return(
        <React.Fragment>
            <CommonTitle titleName={'게시글 리뷰'}/>
            <GetReviewList review={inputReview.review}/>
            <button className={'btn'} onClick={handleAddBtnClick} value={postNum}><FaPlusCircle/>등록</button>
            <button className={'btn'} onClick={handleEditBtnClick} value={postNum}><FaChevronCircleLeft/>수정</button>
            <button className={'btn'} onClick={handleDeleteBtnClick}><FaMinusCircle/>삭제</button>
            <button className={'btn'} onClick={handleCancelBtnClick}><FaChevronCircleLeft/>취소</button>
        </React.Fragment>
    );
};

export default ViewReview;