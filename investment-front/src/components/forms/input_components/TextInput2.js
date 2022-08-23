import React from 'react';
import { Input, InputGroup } from 'rsuite';
import { Controller } from 'react-hook-form';



export default function TextInput2({
    name,
    control,
    button,
    buttonProps,
    placeholder = null,
    ...props
}) {
    return <InputGroup>
        <Controller
            name={name}
            control={control}
            render={({ field })=> 
                <Input
                    {...field} 
                    {...props}
                    placeholder={placeholder} 
                />
            }
        />
        {
            button &&
            <InputGroup.Button {...buttonProps} >
                {button}
            </InputGroup.Button>
        }
        { props.children }
    </InputGroup>
}