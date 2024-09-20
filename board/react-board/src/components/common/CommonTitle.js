import React from "react";

const CommonTitle = (props) => {
    const { titleName } = props;

    return (
        <div>
            <h1 className={'pageTitle'}>{titleName}</h1>
        </div>

    )
}

export default CommonTitle;