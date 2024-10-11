import React from 'react';
import ReviewFormat from "../common/ReviewFormat";

const GetReviewList = (props) =>{
    const {review, clickAction} = props;

    const handleTdClick = (e) =>{
        const {reviewNum} = e.currentTarget.dataset;

        if(typeof clickAction === 'function'){
            const target = review.find(value => value.reviewNum === reviewNum)
            clickAction(target); //리뷰 클릭하면 액션 수행됨
        }
    }

    return(
      <ReviewFormat titleName={'리뷰 리스트'}>
          <div className={'review-item'}>
              {review.map((review,index) =>( //원래 배열.map(현재요소)
                  <div className={'review-item'} key={index} onClick={handleTdClick}>
                      <h3>리뷰 #{review.reviewNum || 'N'}</h3>
                      <h4>작성자: {review.writer}</h4>
                      <textarea className={'review-textarea'} value={review.content} readOnly/>
                  </div>
              ))}
          </div>
      </ReviewFormat>
    );
};

export default GetReviewList;