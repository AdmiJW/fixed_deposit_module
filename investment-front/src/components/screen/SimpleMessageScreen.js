
import React from 'react';
import * as yup from 'yup';


// A simple message display consisting of an icon, title message, message and perhaps button.
//
// If icon passed is string, it is assumed to be classnames of font awesome icon, thus will be wrapped in <i> tag.
export default function SimpleMessageScreen({
    icon, 
    title, 
    message, 
    links
}) {
    if (yup.array().of( yup.string() ).isValidSync(icon)) 
        icon = <i className={'fs-1 mb-3 ' + icon.join(' ') } ></i>


    return <div className="text-center my-4">
        { icon }
        <div className="display-5">{ title }</div>
        <div className="my-3 lead">{ message }</div>
        { links }
    </div>;
}