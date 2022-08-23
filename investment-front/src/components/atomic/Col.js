import React from "react";

// Simply wrapper component that applies bootstrap col-md
const Col = ({ className, children, ...props })=> {
    const cls = `col-md ${className}`;
    return <div className={cls} {...props}>{ children }</div>
}
export default Col;

