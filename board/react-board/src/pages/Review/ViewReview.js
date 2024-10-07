import React, {useEffect, useState} from 'react';
import CommonTitle from "../../components/common/CommonTitle";
import GetReviewList from "../../components/jobList/GetReviewList";
import {useNavigate} from "react-router-dom";
import {FaChevronCircleLeft, FaPlusCircle} from "react-icons/fa";
import {restCall} from "../../util";

const ViewReview = () =>{
    const [inputReview, setInputReview] = useState({review: [], cnt: 1});
    const navigate = useNavigate();

    //리뷰 데이터를 가져옴
    useEffect(() => {
        restCall('GET', '/getReview')
            .then(response => {
                setInputReview({review: response, cnt: response.length});
            }).catch(error=>{
                // console.error('리뷰 데이터 get하는 도중에 오류 발생: ', error);
        });
    }, []);

    //등록 버튼 누르면 리뷰 등록 페이지로 이동
    const handleAddBtnClick = (e)=>{
        navigate('/addReview');
    }

    //수정 버튼 누르면 리뷰 수정 페이지로 이동
    const handleEditBtnClick =(e)=>{
        navigate('/editReview');
    }

    //취소 버튼 누르면 앞페이지(ViewBoard-게시판 상세 보기)로 이동됨.
    const handleCancelBtnClick = (e) =>{
        navigate(-1);
    }

    return(
        <React.Fragment>
            <CommonTitle titleName={'게시글 리뷰'}/>
            <GetReviewList review={inputReview.review}/>
            <button className={'btn'} onClick={handleAddBtnClick}><FaPlusCircle/>등록</button>
            <button className={'btn'} onClick={handleEditBtnClick}><FaChevronCircleLeft/>수정</button>
            <button className={'btn'} onClick={handleCancelBtnClick}><FaChevronCircleLeft/>취소</button>
        </React.Fragment>
    );
};

export default ViewReview;