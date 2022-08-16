import React from 'react';


export default function LoadControl(props) {
    return (
        <React.Fragment>
            <div className="d-flex" id="wrapper">
                {props.children}
            </div>
        </React.Fragment>

    )
}