import {useNavigate} from "react-router-dom";
import React, {useState} from "react";
import {restCall} from "../../util";
import CommonTitle from "../../components/common/CommonTitle";
import EditReviewList from "../../components/jobList/EditReviewList";
import {FaChevronCircleLeft, FaPlusCircle} from "react-icons/fa";

const AddReview = (props) =>{
    const [inputReview, setInputReview] = useState({review: [{writer:'', content:''}], cnt:1});
    const navigate = useNavigate();

    //EditReview에서 입력 값이 변경될 때 마다 전달 받은 데이터를 처리해서 상태 업데이트
    const handleInput = (e) =>{
        setInputReview({review:e, cnt:1});
    }

    // //등록 버튼 누르면 호출됨
    // const handleAddBtnClick =(e) =>{
    //     console.log('Submitting inputReview: ', inputReview.review[0]);
    //
    //     restCall('POST', '/addReview', inputReview.review[0])
    //         .then(res =>{ //리뷰 등록 시에는 post
    //             alert('리뷰가 등록되었습니다.');
    //             navigate('/'); //리뷰 페이지로 이동..(여기를 모달창 닫는 방법으로 바꿀 것!!)
    //         }).catch(error =>{
    //             console.error('리뷰 등록 오류: ', error);
    //             alert('리뷰 등록 실패');
    //     });
    // }

    // //취소 버튼 누르면 ViewReview 페이지로 이동함
    // const handleCancelBtnClick =(e)=>{
    //     navigate(-1);
    // }

    return(
        <React.Fragment>
            <CommonTitle titleName={'리뷰 등록'}/>
            <EditReviewList review={inputReview.review} inputReview={handleInput}/>
            {/*<button className={'btn'} onClick={handleAddBtnClick}><FaPlusCircle/>등록</button>*/}
        </React.Fragment>
    );
}

export default AddReview;