import React from 'react';
import { Form, InputNumber } from 'rsuite';
import { Controller } from 'react-hook-form';



export default function NumberInput({
    name,
    label,
    control,
    errorMessage,
    ...props
}) {
    return <Form.Group controlId={name} >
        <Form.ControlLabel>{label}</Form.ControlLabel>
        <Controller
            name={name}
            control={control}
            render={({ field })=>
                <InputNumber {...field} {...props} />
            }
        />
        <Form.ErrorMessage show={ errorMessage && true } >
            {errorMessage}
        </Form.ErrorMessage>
    </Form.Group>
}