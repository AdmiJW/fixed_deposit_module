import React from 'react';
import { Form, Input } from 'rsuite';
import { Controller } from 'react-hook-form';


// Textarea with reference set.
const Textarea = React.forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);


export default function TextArea({
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
                <Form.Control 
                    {...field}
                    {...props}
                    accepter={Textarea}
                />
            }
        />
        <Form.ErrorMessage show={ errorMessage && true } >
            {errorMessage}
        </Form.ErrorMessage>

        { props.children }
    </Form.Group>
}