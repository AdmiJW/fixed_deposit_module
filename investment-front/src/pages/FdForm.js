import React, { useContext, useState, useLayoutEffect, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Input, ButtonGroup, InputNumber, InputGroup, DatePicker, ButtonToolbar } from 'rsuite';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { AppContext } from '../AppContext';
import LoadingScreen from '../components/LoadingScreen';
import { getUpsertView, postUpsert, getInterestAmount } from '../services/restServer';




// Textarea with reference set.
const Textarea = React.forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);
// Form initial values
const initialValues = {
    // Id. Required to update existing record.
    id: null,
    
    // Form Group 1 - Registration
    name: '',
    registeredBy: '',
    registeredDate: null,
    bank: '',
    certificateNo: '',
    referenceNo: '',
    comment: '',

    // Form Group 2 - FD Details
    startDate: null,
    period: 6,
    initialAmount: 0,
    interestRate: 0,
};
// Validation schema of form
const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    registeredBy: Yup.string().required('Required'),
    registeredDate: Yup.date().required('Required'),
    bank: Yup.string().required('Required'),
    certificateNo: Yup.string().required('Required'),
    referenceNo: Yup.string().required('Required'),
    comment: Yup.string(),
    startDate: Yup.date().required('Required'),
    period: Yup.number().min(1, 'Minimum must be 1 month').required('Required'),
    initialAmount: Yup.number().min(0, 'Principal amount cannot be negative').required('Required'),
    interestRate: Yup.number().min(0, 'Interest rate cannot be negative').max(100, 'Interest rate cannot exceed 100%').required('Required'),
});





function FdForm(props) {
    const { setCrumb, setDanger, setSuccess, setInfo } = useContext(AppContext);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ interest, setInterest ] = useState(0);
    const [ status, setStatus ] = useState("Drafting");

    const { id } = useParams();
    const navigate = useNavigate();

    // Form Handler - Formik.
    const formik = useFormik({
        initialValues,
        validationSchema,
        // Submit handler
        onSubmit: formData => postUpsert({
            formData,
            onInit: () => {
                setInfo('Submitting data...');
                window.scrollTo(0, 0);
            },
            onSuccess: (data) => {
                formik.setValues(data);
                formik.setStatus(data.status);
                formik.setFieldValue('startDate', new Date(data.startDate));
                formik.setFieldValue('registeredDate', new Date(data.registeredDate));
                setSuccess('Data submitted successfully.');
            },
            onFailure: (err) => setDanger(err.message || "Failed to submit fixed deposit data"),
            onFinal: () => setIsLoading(false)
        }),
    });
    // Whether we are editing existing fd, and it is not in NEW state
    const isDisableEditing = formik.values.status && formik.values.status !== 'NEW';


    // Calculate interest from server
    function calculateTotalInterest() {
        getInterestAmount({
            onSuccess: (data) => setInterest(data.interest),
            onFailure: (err) => {
                setDanger("Failed to calculate interest amount: " + err.error);
                window.scrollTo(0, 0);
            },
            principalAmount: formik.values.initialAmount,
            interestRate: formik.values.interestRate,
            period: formik.values.period,
        });
    }

    // Reset form and states
    function resetForm() {
        formik.resetForm();
        setInterest(0);
        setStatus("Drafting");
    }


    // Component factory pattern
    function generateTextFieldGroup(fieldName, labelName) {
        return <Form.Group className='col-md' controlId={fieldName}>
            <Form.ControlLabel>{labelName}</Form.ControlLabel>
            <Form.Control 
                disabled={isDisableEditing}
                errorMessage={formik.touched[fieldName] && formik.errors[fieldName]? formik.errors[fieldName]: null}
                {...formik.getFieldProps(fieldName) } 
                onChange={(v,e)=> formik.handleChange(e)}
            />
        </Form.Group>;
    }

    function generateDatePickerGroup(fieldName, labelName) {
        return <Form.Group className='col-md' controlId={fieldName}>
            <Form.ControlLabel>{labelName}</Form.ControlLabel>
            <DatePicker 
                oneTap
                disabled={isDisableEditing}
                className='w-100'
                {...formik.getFieldProps(fieldName) } 
                onChange={v => formik.setFieldValue(fieldName, v) }
                onBlur={()=> formik.setFieldTouched(fieldName, true) }
            />
            <p className='px-2 text-danger'>
                { formik.touched[fieldName] && formik.errors[fieldName]? 'Invalid date': null }
            </p>
        </Form.Group>;
    }

    function generateNumberFieldGroup(fieldName, labelName, min, max, step, prefix, postfix) {
        return <Form.Group className='col-md' controlId={fieldName}>
            <Form.ControlLabel>{labelName}</Form.ControlLabel>
            <InputNumber 
                disabled={isDisableEditing}
                className='w-100'
                name={fieldName}
                prefix={prefix} postfix={postfix}
                min={min} max={max} step={step}
                {...formik.getFieldProps(fieldName) } 
                onChange={v => formik.setFieldValue(fieldName, v )}
            />
            <p className='px-2 text-danger'>
                { formik.touched[fieldName] && formik.errors[fieldName]? formik.errors[fieldName]: null }
            </p>
        </Form.Group>;
    }


    // Get data from server when id is provided
    useEffect(() => {
        if (!id) return;
        
        getUpsertView({
            id,
            onInit: ()=> {
                setDanger(null);
                resetForm();
            },
            onLoading: ()=> setIsLoading(true),
            onSuccess: (data) => {
                formik.setValues(data);
                formik.setFieldValue('startDate', new Date(data.startDate));
                formik.setFieldValue('registeredDate', new Date(data.registeredDate));
                setStatus(data.status);
            },
            onFailure: (err) => setDanger(err.message || "Failed to retrieve fixed deposit data"),
            onFinal: ()=> setIsLoading(false),
        });
    // ! DO NOT ADD formik to the dependency array!
    }, [id, setDanger]);



    // Set breadcrumb value
    useLayoutEffect(() => {
        setCrumb([{ name: props.route.name }]);
    }, [props.route.name, setCrumb]);



    if (isLoading) return <LoadingScreen text='Retrieving Fixed Deposit Information...' />;

    return (
    <Form fluid onSubmit={formik.handleSubmit}>

        <h4 className="mb-3">{props.route.name} 🏦</h4>

        <div className='rounded bg-white shadow-sm p-3 mb-4'>
            {/* Name */}
            { generateTextFieldGroup('name', 'FD Name')}

            {/* Registrant's Name, Registration Date, Bank */}
            <div className="row">
                { generateTextFieldGroup('registeredBy', "Registrant's Name")}
                { generateDatePickerGroup('registeredDate', 'Registration Date')}
                { generateTextFieldGroup('bank', 'Bank')}
            </div>

            {/* Cert No, Ref No */}
            <div className="row">
                { generateTextFieldGroup('certificateNo', 'Certificate No.')}
                { generateTextFieldGroup('referenceNo', 'Reference No.')}
            </div>

            {/* Comment */}
            <Form.Group controlId="comment" className='col-md'>
                <Form.ControlLabel>Comment</Form.ControlLabel>
                <Form.Control 
                    disabled={isDisableEditing}
                    accepter={Textarea} 
                    placeholder='Write your comment here...'
                    errorMessage={formik.touched.comment && formik.errors.comment? formik.errors.comment: null}
                    {...formik.getFieldProps('comment') } 
                    onChange={(v,e)=> formik.handleChange(e)}
                />
            </Form.Group>
        </div>

        <hr/>

        <div className='rounded bg-white shadow-sm p-3 mb-4'>
            {/* Start Date, Period */}
            <div className='row'>
                { generateDatePickerGroup('startDate', 'Start Date')}
                { generateNumberFieldGroup('period', 'Period (Months)', 1, 100, 1, null, null)}
            </div>

            {/* Principal Amount, Interest Rate */}
            <div className='row'>
                { generateNumberFieldGroup('initialAmount', 'Principal Amount', 0, Number.MAX_VALUE, 0.01, 'RM', null)}
                { generateNumberFieldGroup('interestRate', 'Interest Rate', 0, 100, 0.01, null, '%')}
            </div>


            {/* Interest Amount, Status (Not for editing, only display) */}
            <div className='row'>
                <Form.Group className='col-md'>
                    <Form.ControlLabel>Interest Amount</Form.ControlLabel>
                    <InputGroup className='w-100'>
                        <InputNumber name="" disabled className='w-100' prefix='RM' value={interest} />
                        <InputGroup.Button className='bg-primary text-white' onClick={calculateTotalInterest} >Kira</InputGroup.Button>
                    </InputGroup>
                </Form.Group>
                <Form.Group className='col-md' controlId="interestRate">
                    <Form.ControlLabel>Status</Form.ControlLabel>
                    <Form.Control name="" disabled value={status} />
                </Form.Group>
            </div>
        </div>

        



        {/* Button controls */}
        <ButtonToolbar className='d-flex justify-content-between'>
            <ButtonGroup >
                <Button size='lg' appearance="primary" type="submit" disabled={isDisableEditing}>
                    Submit <i className="fas fa-paper-plane"></i>
                </Button>
                <Button size='lg' appearance="primary" color='yellow' onClick={formik.resetForm} disabled={ status !== 'Drafting' } >
                    Clear <i className="fas fa-redo"></i>
                </Button>
            </ButtonGroup>

            {
                formik.values.status === 'NEW'? 
                <ButtonGroup>
                    <Button size='lg' appearance="primary" color='green' onClick={()=> navigate(`/fd/approve/${formik.values.id}`)} >
                        Approve <i className="fas fa-check"></i>
                    </Button>
                    <Button size='lg' appearance="primary" color='yellow' onClick={()=> navigate(`/fd/reject/${formik.values.id}`)} >
                        Reject <i className="fas fa-times"></i>
                    </Button>
                    <Button size='lg' appearance="primary" color='red' onClick={()=> navigate(`/fd/delete/${ formik.values.id }`) }>
                        Delete <i className="fas fa-trash"></i>
                    </Button>
                </ButtonGroup>
                : formik.values.status?
                <ButtonGroup>
                    {
                        formik.values.status === 'APPROVED'?
                        <Button size='lg' appearance="primary" color='cyan' onClick={()=> navigate(`/fd/addition_withdraw/${ formik.values.id }`)} >Deposit/Withdrawal</Button>
                        : null
                    }
                    <Button size='lg' appearance="primary" color='red' onClick={()=> navigate(`/fd/delete/${ formik.values.id }`) }>
                        Delete <i className="fas fa-trash"></i>
                    </Button> 
                </ButtonGroup>
                : null
            }

            <ButtonGroup >
                <Button disabled={!formik.values.id} size='lg' appearance="primary" color='cyan'
                    onClick={()=> navigate(`/fd/schedules/${ formik.values.id }`) }
                >
                    View Schedules <i className="fas fa-calendar-alt ms-2"></i>
                </Button>
            </ButtonGroup>
        </ButtonToolbar>
    </Form>
    );
}


export default FdForm;