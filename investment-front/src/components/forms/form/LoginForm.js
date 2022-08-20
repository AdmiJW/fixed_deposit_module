import React from 'react';
import { Link } from 'react-router-dom';
import { Button, ButtonGroup, Form } from 'rsuite';

import { useForm } from 'react-hook-form'
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import TextInput from '../input_components/TextInput';
import SingleCheckbox from '../input_components/SingleCheckbox';



const schema = Yup.object({
    username: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
    rememberMe: Yup.boolean().required("Required"),
});




function LoginForm(props) {
    const { loginHandler, prevUsername } = props;

    const defaultValues = {
        username: prevUsername,
        password: '',
        rememberMe: false,
    }


    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues,
        resolver: yupResolver(schema),
    });




    return (
    <Form fluid className='card m-auto p-3 rounded shadow-sm' 
        style={{ maxWidth: '500px'}}
        onSubmit={ handleSubmit(loginHandler) }
    >
        <h4 className='text-center fw-bold mb-3 lead'>Login</h4>

        <TextInput
            control={control}
            name='username'
            label='Username'
            error={errors.username?.message}
        />

        <TextInput
            control={control}
            name='password'
            label='Password'
            error={errors.password?.message}
            type='password'
        />

        <SingleCheckbox
            control={control}
            name='rememberMe'
            label='Remember Me'
        />


        <ButtonGroup className='mt-3 m-auto'>
            <Button appearance='primary' size='lg' type="submit" >
                Submit
            </Button>
            <Button appearance='primary' color='yellow' size='lg' onClick={()=> reset(defaultValues)}>
                Clear
            </Button>
        </ButtonGroup>


        <span className='text-muted text-center mt-4'>
            Haven't register? <Link to='/register'>Register now</Link>
        </span>
    </Form>
    );
}



export default LoginForm;