import React from 'react';
import { Form, Checkbox } from 'rsuite';
import { Controller } from 'react-hook-form';



export default function SingleCheckbox({
    name,
    label,
    control,
    errorMessage,
    ...props
}) {
    return <Form.Group controlId={name} >
        <Controller
            name={name}
            control={control}
            render={ ({ field }) => {
                return <Checkbox 
                    {...field}
                    {...props} 
                    onChange={(_, value)=> field.onChange(value)}
                > 
                    {label}
                </Checkbox>
            }}
        />
        <Form.ErrorMessage show={ errorMessage && true } >
            {errorMessage}
        </Form.ErrorMessage>

        { props.children }
    </Form.Group>
}