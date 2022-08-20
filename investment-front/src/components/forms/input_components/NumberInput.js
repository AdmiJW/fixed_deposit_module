import React from 'react';
import { Form, InputGroup, InputNumber } from 'rsuite';
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
        <InputGroup className='w-100'>
            <Controller
                name={name}
                control={control}
                render={({ field })=>
                    <InputNumber {...field} {...props} />
                }
                errorMessage={errorMessage}
            />
            { props.children }
        </InputGroup>
    </Form.Group>
}