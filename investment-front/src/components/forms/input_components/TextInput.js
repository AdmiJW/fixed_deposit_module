import React from 'react';
import { Form } from 'rsuite';
import { Controller } from 'react-hook-form';



export default function TextInput({
    name,
    label,
    control,
    errorMessage,
    placeholder = null,
    ...props
}) {
    return <Form.Group controlId={name} >
        <Form.ControlLabel>{label}</Form.ControlLabel>
        <Controller
            name={name}
            control={control}
            render={({ field })=> 
                <Form.Control 
                    {...field} 
                    {...props}
                    errorMessage={ errorMessage } 
                    placeholder={placeholder} 
                />
            }
        />

        { props.children }
    </Form.Group>
}