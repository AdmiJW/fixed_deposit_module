import React from 'react';


export default function CurrencySpan({ value = 0.0, prefix = 'RM', className = '' }) {
    return <span className={className} >
        {prefix}{ value.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) }
    </span>;
}