import React from 'react';
import { Form, DatePicker } from 'rsuite';
import { Controller } from 'react-hook-form';



export default function DatePicker({
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
            render={({ field })=> <DatePicker {...field} {...props} oneTap />}
        />
        <Form.ErrorMessage show={ errorMessage && true } >
            {errorMessage}
        </Form.ErrorMessage>
    </Form.Group>
}