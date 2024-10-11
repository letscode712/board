import {useLocation, useNavigate} from "react-router-dom";
import React, {useState} from "react";
import {restCall} from "../../util";
import CommonTitle from "../../components/common/CommonTitle";
import EditReviewList from "../../components/jobList/EditReviewList";
import {FaChevronCircleLeft, FaPlusCircle, FaRegCommentDots} from "react-icons/fa";

const AddReview = (props) =>{
    const location = useLocation();
    const postNum = location.state.postNum;
    const [inputBoard, setInputBoard] = useState({review: {reviewNum: '', postNum:postNum ,writer:'', content:''}, cnt:1});
    const navigate = useNavigate();

    //EditReview에서 입력 값이 변경될 때 마다 전달 받은 데이터를 처리해서 상태 업데이트
    const handleInput = (e) =>{
        console.log("=====e=====>",e)
        setInputBoard({review:e, cnt:1}); //리뷰가 객체 상태로 변환됨
    }

    //등록 버튼 누르면 호출됨
    const handleAddBtnClick =(e) =>{
        restCall('POST', '/addReview', inputBoard.review)
            .then(res =>{ //리뷰 등록 시에는 post
                console.log('저장 버튼 누르면 전달되는 res: ', res);
                alert('리뷰가 등록되었습니다.');
                navigate(-1); //리뷰 페이지로 이동..(여기를 모달창 닫는 방법으로 바꿀 것!!)
            }).catch(error =>{
                console.error('리뷰 등록 오류: ', error);
                alert('리뷰 등록 실패');
        });
    }

    //취소 버튼 누르면 ViewReview 페이지로 이동함
    const handleCancelBtnClick =(e)=>{
        navigate(-1);
    }

    return(
        <React.Fragment>
            <CommonTitle titleName={'리뷰 등록'}/>
            <EditReviewList review={inputBoard.review} inputReview={handleInput}/>
            <button className={'btn'} onClick={handleAddBtnClick}><FaRegCommentDots/>저장</button>
            <button className={'btn'} onClick={handleCancelBtnClick}><FaChevronCircleLeft/>취소</button>
        </React.Fragment>
    );
}

export default AddReview;