import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import ReviewFormat from "../common/ReviewFormat";
import {FaChevronCircleLeft, FaRegCommentDots} from "react-icons/fa";
import {restCall} from "../../util";

const EditReviewList = (props) =>{
    const {review, inputReview} = props; //수정할 리뷰와 저장 함수
    const [ inputBoard, setInputBoard ] = useState( { review: review, cnt: 1 } );

    //리뷰 내용 수정..배열을 사용하는 코드
    const handleInput = (e) =>{
        const {name, value} = e.target;
        const {index} = e.currentTarget.dataset;

        //리스트의 현재 인덱스를 업데이트
        const temp = [...inputBoard.review]; //상태변환을 위해 복사한 배열을 사용...원본 배열에 바로 상태변환은 좋지 않음.
        temp[index] = {...temp[index], [name]: value}; //복사한 배열을 변경해줌

        setInputBoard({...inputBoard, review: temp}); //inputBoard를 새롭게 복사하고 바꾼 temp로 바꿔줌
    }

    //입력값 변경 핸들러..객체 형태의 review
    // const handleInput = (e) => {
    //     const {name, value} = e.target;
    //     setInputBoard((prevState) => ({ //prevState라는 내장
    //         review: {
    //             ...prevState.review, //복사된 리뷰가 객체형태임
    //             [name]:value
    //         },
    //         cnt:1
    //     }));
    // };

    //상태변환함수를 통해 바로 업데이트 되도록함.
    useEffect(() => {
        inputReview(inputBoard.review);
    }, [inputBoard.review]);

    return(
        <ReviewFormat>
            <div className={'review-item'}>
                <h3>리뷰 #{review.reviewNum || 'N'}</h3>
                <h4>작성자:
                    <input
                        className={'inputText'}
                        name="writer"
                        defaultValue={inputReview.writer || ''}
                        onChange={handleInput}
                    />
                </h4>
                <textarea
                    className={'review-textarea'}
                    name="content"
                    //value로 하면 수정되지 않고 값만 보임..input창에서 수정하려면 defaultValue 사용할 것
                    defaultValue={inputReview.content || ''}
                    onChange={handleInput}
                />
            </div>
        </ReviewFormat>
    );
};

export default EditReviewList;




