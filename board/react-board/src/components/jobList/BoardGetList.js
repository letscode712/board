import React, {useEffect, useState} from "react";
import TableFormat from "../common/TableFormat";
import {useNavigate} from "react-router-dom";

const BoardGetList = (props) => {
    const { list, cnt, clickAction } = props; //비구조화 할당
    const navigate = useNavigate(); //link를 사용하지 않고 다른 페이지로 이동할 때 사용하는 훅

    const handleTdClick = (e) => {
        const { num }  = e.currentTarget.dataset;

        if ( typeof clickAction === 'function') {
            const target = list.find(value => value.num == num) //find함수: 조건에 일치하는 값을 바로 반환해줌. 일치하지 않으면 undefined 반환함.
            clickAction(target);
        }
    }

    return (
        <TableFormat>
            <thead>
            <tr className="trCss">
                <th className='w10p'>num</th>
                <th className='w20p'>writer</th>
                <th className='w20p'>title</th>
                <th className='w30p'>content</th>
                <th className='w15p'>date</th>
            </tr>
            </thead>
            <tbody>
            {list.map((value, index) => {
                    return (
                        <tr  key={index} data-num={value.num} onClick={handleTdClick}>
                            <td>{value.num}</td>
                            <td>{value.writer}</td>
                            <td>{value.title}</td>
                            <td>{value.content}</td>
                            <td>{value.date}</td>
                        </tr>
                    )
                })
            }
            </tbody>
        </TableFormat>
    )
};

export default BoardGetList;