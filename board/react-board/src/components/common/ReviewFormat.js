import React from 'react';

const ReviewFormat = (props)=>{
    return (
        <div className={'review-container'}>
                <form>
                    {props.children}
                </form>
        </div>
    );
};

export default ReviewFormat;