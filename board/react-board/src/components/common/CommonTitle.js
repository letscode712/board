import React from "react";

const CommonTitle = (props) => {
    const { titleName } = props;

    return (
        <div>
            <h3>{titleName}</h3>
        </div>

    )
}

export default CommonTitle;