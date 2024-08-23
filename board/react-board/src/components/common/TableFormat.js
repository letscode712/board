import React from 'react';

const TableFormat = (props) => {

    return (
        <div className="table table-striped">
            <div className="table-wrap">
                <table>
                    {props.children}
                </table>
            </div>
        </div>
    );
};

export default TableFormat;