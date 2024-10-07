import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import ReviewFormat from "../common/ReviewFormat";
import {FaChevronCircleLeft, FaRegCommentDots} from "react-icons/fa";
import {restCall} from "../../util";

const EditReviewList = (props) =>{
    const {review} = props; //수정할 리뷰와 저장 함수
    const [editReview, setEditReview] = useState(review); //전달받은 리뷰를 수정할 리뷰로 설정하기
    const navigate = useNavigate();

    //리뷰 내용 수정
    const handleInput = (e) =>{
        // const {index} = e.currentTarget.dataset;
        // const temp = editReview.review;
        // temp[index] = {...temp[index], [e.currentTarget.name]: e.currentTarget.value};
        // setEditReview({...editReview, review:temp});
        const {name, value} = e.target;

        setEditReview((prevState)=>({
            ...prevState,
            [name]: value //해당 필드만 업데이트
        }));
    }

    //저장 버튼 누르면 수정된 리뷰 저장
    const handleAddBtnClick = (e) =>{
        console.log('Submitting inputReview: ', editReview.review[0]); //editReview

        restCall('POST', '/addReview', editReview.review[0]) //editReview
            .then(res=>{
                alert('리뷰가 등록되었습니다.');
                navigate(-1); //앞페이지로 이동
            }).catch(error=>{
                // console.error('리뷰 등록 오류: ', error);
                alert('리뷰 등록 실패');
        });
    }

    const handleCancelBtnClick = () =>{
        navigate(-1);
    }

    return(
        <ReviewFormat titleName={'리뷰 수정'}>
            <div className={'review-item'}>
                <h4>작성자:
                    <input
                        className={'inputText'}
                        name="writer"
                        defaultValue={editReview.writer || ''}
                        onChange={handleInput}
                    />
                </h4>
                <textarea
                    className={'review-textarea'}
                    name="content"
                    value={editReview.content || ''}
                    onChange={handleInput}
                />
                <button className={'btn'} onClick={handleAddBtnClick}><FaRegCommentDots/>저장</button>
                <button className={'btn'} onClick={handleCancelBtnClick}><FaChevronCircleLeft/>취소</button>
            </div>
        </ReviewFormat>
    );
};

export default EditReviewList;




