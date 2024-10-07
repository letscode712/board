import {useLocation, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {restCall} from "../../util";
import CommonTitle from "../../components/common/CommonTitle";
import {FaChevronCircleLeft, FaPen} from "react-icons/fa";
import EditReviewList from "../../components/jobList/EditReviewList";

const EditReview = (props) =>{
    const navigate= useNavigate();
    const location = useLocation();
    const reviewA = location.state; //현재 클릭한 리뷰
    const [editReview, setEditReview] = useState({review: [{writer:reviewA.writer, content: reviewA.content}], cnt:1});

    //리뷰 수정
    const handleInput = (value) =>{
        setEditReview((prevState) =>({
            ...prevState, review: value
        }));
    }

    const handleEditClick =(e)=>{
        restCall('POST', '/editReview', editReview.review[0])
            .then(res =>{
                console.log("res message: ", res);
                if(res.status === 'OK'){
                    alert("리뷰가 수정되었습니다.");
                    navigate('/');
                }
            }).catch(e=>{
                // console.error('catch블록 실행: ', e);
            });
    }

    const handleCancelBtnClick = (e) =>{
        navigate(-1);
    }

    useEffect(() =>{
        restCall('GET', '/getReview', {cnt: reviewA.cnt})
            .then(res => {
                if(Array.isArray(res)){
                    setEditReview({review: res, cnt:1}); //이전 reviewA를 수정해줌
                }
            }).catch(e=> console.error('catch 블록 실행: ', e));
    }, []);

    return(
        <React.Fragment>
            <CommonTitle titleName={'리뷰 수정'}/>
            <EditReviewList review={editReview.review} inputReview={handleInput}/>
            {/*<button className={'btn'} onClick={handleEditClick}><FaPen/>수정</button>*/}
            {/*<button className={'btn'} onClick={handleCancelBtnClick}><FaChevronCircleLeft/>취소</button>*/}
        </React.Fragment>
    );
}