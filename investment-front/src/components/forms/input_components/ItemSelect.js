import React from 'react';
import { Form, InputPicker } from 'rsuite';
import { Controller } from 'react-hook-form';



export default function ItemSelect({
    name,
    label,
    control,
    data,
    errorMessage,
    ...props
}) {
    return <Form.Group controlId={name} >
        <Form.ControlLabel>{label}</Form.ControlLabel>
        <Controller
            name={name}
            control={control}
            render={({ field })=>
                <InputPicker data={data} {...field} {...props} />
            }
        />
        <Form.ErrorMessage show={ errorMessage && true } >
            {errorMessage}
        </Form.ErrorMessage>

        { props.children }
    </Form.Group>
}