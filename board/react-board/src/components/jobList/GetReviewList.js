import React from 'react';
import ReviewFormat from "../common/ReviewFormat";

const GetReviewList = (props) =>{
    const {review} = props;

    return(
      <ReviewFormat>
          <div className={'review-item'}> {/*css에서 reivew-container로 하던가...따로 설정해주던가 해야할듯?*/}
              {review.map((review, index) =>( //원래 배열.map(현재요소)
                  <div className={'review-item'} key={index}>
                      <h4>작성자: {review.writer}</h4>
                      <textarea className={'review-textarea'} value={review.content} readOnly/>
                  </div>
              ))}
          </div>
      </ReviewFormat>
    );
};

export default GetReviewList;