import React, {useEffect, useState} from "react";
import TableFormat from "../common/TableFormat";
import {useLocation, useNavigate} from "react-router-dom";

const BoardEditList = (props) => {
    const {list, inputList} = props;
    const [ inputBoard, setInputBoard ] = useState( { list: list, cnt: 1 } );

    const handleInput = (e) => {
        const { index } = e.currentTarget.dataset;

        const temp = inputBoard.list;
        temp[index] = { ...temp[index], [e.currentTarget.name]: e.currentTarget.value };
        setInputBoard({...inputBoard, list: temp});
        inputList(inputBoard.list);
    }

      return(
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
                          <tr key={index}>
                              <td><input className={'inputText'} name="num" type="text" readOnly/></td>
                              <td><input className={'inputText'} data-index={index} name="writer" type="text" onInput={handleInput} defaultValue={value.writer || ''}/></td>
                              <td><input className={'inputText'} data-index={index} name="title" type="text" onInput={handleInput} defaultValue={value.title  || ''}/></td>
                              <td><input className={'inputText'} data-index={index} name="content" type="text" onInput={handleInput} defaultValue={value.content || ''}/></td>
                              <td><input className={'inputText'} name="date" type="text" readOnly/></td>
                          </tr>
                      )
                  })
              }
              </tbody>
          </TableFormat>
      );
};

export default BoardEditList;

