import React from 'react';
import { Form, RadioGroup, Radio } from 'rsuite';
import { Controller } from 'react-hook-form';



export default function RadioSelect({
    name,
    label,
    control,
    values,
    errorMessage,
    ...props
}) {
    return (
    <Controller
        name={name}
        control={control}
        render={({ field })=> (
        <>
            <Form.ControlLabel>{label}</Form.ControlLabel>
            <RadioGroup {...field} {...props} inline> 
                { values.map(value => <Radio key={value.value} value={value.value}>{value.label}</Radio> ) }
            </RadioGroup>
            <Form.ErrorMessage show={ errorMessage && true } >
                {errorMessage}
            </Form.ErrorMessage>

            { props.children }
        </>
        )}
    />
    );
}