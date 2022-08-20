import React, { useContext, useState, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, ButtonGroup } from 'rsuite';

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { AppContext } from '../AppContext';
import LoadingScreen from '../components/screen/LoadingScreen';
import { register } from '../services/restServer';

import ROLE from "../interfaces/Role";
import GENDER from "../interfaces/Gender";

import TextInput from "../components/forms/input_components/TextInput";
import ItemSelect from "../components/forms/input_components/ItemSelect";
import DateSelect from "../components/forms/input_components/DateSelect";
import Col from "../components/atomic/Col";



// Form initial values
const defaultValues = {
    // Form Group 1 - Login credentials
    username: '',
    password: '',
    confirmPassword: '',

    // Form Group 2 - Details
    name: '',
    email: '',
    birthdate: null,
    gender: GENDER.MALE,
    role: ROLE.ROLE_USER,
};

// Validation schema of form
const schema = Yup.object({
    username: Yup.string().required('Required'),
    password: Yup.string().required('Required'),
    confirmPassword: Yup.string().required('Required'),

    name: Yup.string().required('Required'),
    email: Yup.string().email("Invalid email").required('Required'),
    birthdate: Yup.date("Invalid date").required('Required'),
    gender: Yup.string().required('Required').oneOf(Object.values(GENDER)),
    role: Yup.string().required('Required').oneOf(Object.values(ROLE)),
});



const REGISTRATION_STATE = {
    DRAFTING: 'DRAFTING',
    SUBMITTING: 'SUBMITTING',
    SUBMITTED: 'SUBMITTED',
}



function Registration(props) {
    const { setCrumb, setDanger, setSuccess } = useContext(AppContext);
    const [ registrationState, setRegistrationState ] = useState(REGISTRATION_STATE.DRAFTING);


    // Form handler 
    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues,
        resolver: yupResolver(schema),
    });



    // Set breadcrumb value
    useLayoutEffect(() => {
        setDanger(null);
        setCrumb([{ name: props.route.name }]);
    }, [props.route.name, setCrumb, setDanger]);



    // Handle form submit
    function submitHandler(formData) {
        register({
            formData,
            onInit: () => setRegistrationState(REGISTRATION_STATE.SUBMITTING),
            onSuccess: () => {
                setSuccess('Registration successful. Please proceed to login.');
                setRegistrationState(REGISTRATION_STATE.SUBMITTED);
            },
            onFailure: (error) => {
                setDanger("Registration failed: " + error.message);
                setRegistrationState(REGISTRATION_STATE.DRAFTING);
            },
        });
    }


    if (registrationState === REGISTRATION_STATE.SUBMITTING) return <LoadingScreen text='Registration submitting...' />;

    return (
    <Form fluid onSubmit={ handleSubmit(submitHandler) }>
        <h4 className="mb-3">{props.route.name} 🏦</h4>

        {/* Username, Password */}
        <div className='rounded bg-white shadow-sm p-3 mb-4'>
            <p className='lead mb-3 fw-bold'>Account</p>

            <TextInput
                control={control}
                name='username'
                label='Username'
                errorMessage={errors.username?.message}
            />

            <div className='row my-2'>
                <Col>
                    <TextInput
                        control={control}
                        name='password'
                        label='Password'
                        errorMessage={errors.password?.message}
                        type='password'
                    />
                </Col>
                <Col>
                    <TextInput
                        control={control}
                        name='confirmPassword'
                        label='Confirm Password'
                        errorMessage={errors.confirmPassword?.message}
                        type='password'
                    />
                </Col>
            </div>
        </div>

        {/* Email, Gender, Name, Birthdate, Role */}
        <div className='rounded bg-white shadow-sm p-3 mb-4'>
            <p className='lead mb-3 fw-bold'>Details</p>

            <div className='row my-2'>
                <Col>
                    <ItemSelect
                        control={control}
                        name='gender'
                        label="Gender"
                        errorMessage={errors.gender?.message}
                        data={ Object.entries(GENDER).map(([key, value]) => { return { value: value, label: key } }) }
                        className='w-100'
                    />
                </Col>
                <Col>
                    <DateSelect
                        control={control}
                        name='birthdate'
                        label="Birthdate"
                        errorMessage={errors.birthdate?.message}
                        className='w-100'
                    />
                </Col>
                <Col>
                    <ItemSelect
                        control={control}
                        name='role'
                        label="Role"
                        errorMessage={errors.role?.message}
                        data={ Object.entries(ROLE).map(([key, value]) => { return { value: key, label: key } }) }
                        className='w-100'
                    />
                </Col>
            </div>

            <TextInput
                control={control}
                name='name'
                label='Full Name'
                errorMessage={errors.name?.message}
            />

            <TextInput
                control={control}
                name='email'
                label='Email'
                errorMessage={errors.email?.message}
            />
        </div>

        <ButtonGroup>
            <Button 
                appearance='primary' size='lg' type='submit' 
                disabled={ registrationState === REGISTRATION_STATE.SUBMITTED }
            >
                Submit
            </Button>
            <Button 
                appearance='primary' size='lg' color='yellow'
                disabled={ registrationState === REGISTRATION_STATE.SUBMITTED }
                onClick={ ()=> reset(defaultValues) }
            >
                Reset
            </Button>
        </ButtonGroup>

        <p className='text-muted my-2 text-center'>Already have an account? <Link to='/login'>Login</Link></p>
    </Form>
    );
}


export default Registration;