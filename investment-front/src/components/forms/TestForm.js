import React, { useEffect } from 'react';
import { Button, Form, DatePicker, InputNumber, SelectPicker } from 'rsuite';
import { useForm, Controller } from 'react-hook-form';

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';


let renderCount = 0;

const schema = Yup.object({
    username: Yup.string().required("Required"),
    birthdate: Yup.date().required("Required"),
    money: Yup.number().required("Required").min(50).max(1000),
    gender: Yup.string().required("Required").oneOf(['M', 'F']),
});


export default function TestForm({}) {
    ++renderCount;
    
    // register gives 4 properties: onBlur, onChange, ref, and name. However, that conflicts with
    // RSuite components. We have to resolve to using Controllers
    //
    // errors mainly give 2 properties: message and type
    const { control, handleSubmit, formState: { errors }, setValue } = useForm({
        defaultValues: {
            username: 'John',
            birthdate: null,
            money: 100,
        },
        // Put resolver as the Yup resolver
        resolver: yupResolver(schema),
    });

    useEffect(()=> {
        setTimeout(() => {
            setValue("money", ++renderCount);
        }, 5000);
    }, [setValue]);

    console.log("ERRORS: ");
    console.log(errors);


    return <Form onSubmit={handleSubmit(console.dir)} >

        {/* Text Field Input */}
        <Form.Group controlId={'username'}>
            <Form.ControlLabel>Username</Form.ControlLabel>
            <Controller
                name="username"
                control={control}
                render={({ field })=> 
                    <Form.Control {...field} errorMessage={ errors.username?.message } />
                }
            />
        </Form.Group>


        {/* Date Picker */}
        <Form.Group controlId={'birthdate'} >
            <Form.ControlLabel>Birthdate</Form.ControlLabel>
            <Controller
                name="birthdate"
                control={control}
                render={({ field })=>
                    <DatePicker {...field} oneTap />
                }
            />
            <Form.ErrorMessage show={ Boolean(errors.birthdate) } >
                {errors.birthdate?.message}
            </Form.ErrorMessage>
        </Form.Group>


        {/* Number input */}
        <Form.Group controlId={'money'} >
            <Form.ControlLabel>Money</Form.ControlLabel>
            <Controller
                name="money"    
                control={control}
                render={({ field })=>
                    <InputNumber {...field} defaultValue={0.01} step={0.01} />
                }
            />
            <Form.ErrorMessage show={ Boolean(errors.money) } >
                {errors.money?.message}
            </Form.ErrorMessage>
        </Form.Group>


        {/* Select Input */}
        <Form.Group controlId={'gender'} >
            <Form.ControlLabel>Gender</Form.ControlLabel>
            <Controller
                name="gender"    
                control={control}
                render={({ field })=>
                    <SelectPicker {...field} data={[
                            { label: 'Male', value: 'M' },
                            { label: 'Female', value: 'F'}
                        ]}
                    />
                }
            />
            <Form.ErrorMessage show={ Boolean(errors.gender) } >
                {errors.gender?.message}
            </Form.ErrorMessage>
        </Form.Group>




        <Button type="submit" appearance="primary">Submit</Button>

        <p className="lead">Render Counter: { renderCount }</p>
    </Form>;
}