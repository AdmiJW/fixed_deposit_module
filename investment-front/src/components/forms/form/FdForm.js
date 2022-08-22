import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, ButtonGroup, InputGroup, ButtonToolbar } from 'rsuite';


import Col from "../../atomic/Col";
import DateSelect from "../input_components/DateSelect";
import TextInput from "../input_components/TextInput";
import NumberInput from "../input_components/NumberInput";
import TextArea from "../input_components/TextArea";

import FdStatus from "../../../interfaces/FdStatus";

import { AppContext } from "../../../AppContext";
import ROLE from "../../../interfaces/Role";






function FdForm({
    // React hook form
    control, handleSubmit, errors,
    // form values (use watch() )
    status, id,

    calculateTotalInterest,
    resetForm,
}) {
    const isDrafting = status === FdStatus.DRAFTING;
    const isNew = status === FdStatus.NEW;
    const isApproved = status === FdStatus.APPROVED;
    const isRejected = status === FdStatus.REJECT;

    const isDisableEditing = !(isDrafting || isNew);

    const navigate = useNavigate();
    const { user } = useContext(AppContext);


    // Reusable Form Component factories
    const getTextField = (name, label, options={})=> (
        <TextInput
            name={name}
            label={label}
            control={control}
            disabled={isDisableEditing}
            errorMessage={errors[name]?.message}
            {...options}
        />
    );

    const getDatePicker = (name, label, options={})=> (
        <DateSelect
            name={name}
            label={label}
            control={control}
            disabled={isDisableEditing}
            errorMessage={errors[name]?.message}
            className='w-100'
            {...options}
        />
    );

    const getNumberField = (name, label, options={})=> (
        <NumberInput
            name={name}
            label={label}
            control={control}
            className='w-100'
            disabled={isDisableEditing}
            errorMessage={errors[name]?.message}
            {...options}
        />
    );

    const getTextArea = (name, label, options={})=> (
        <TextArea
            name={name}
            label={label}
            control={control}
            disabled={isDisableEditing}
            errorMessage={errors[name]?.message}
            {...options}
        />
    );



    return (
    <Form fluid onSubmit={handleSubmit}>

        <div className='rounded bg-white shadow-sm p-3 mb-4'>
            {/* Name */}
            { getTextField('name', 'FD Name') }

            {/* Registrant's Name, Registration Date, Bank */}
            <div className="row my-2">
                <Col>{ getDatePicker('registeredDate', 'Registration Date')}</Col>
                <Col>{ getTextField('bank', 'Bank')}</Col>
            </div>

            {/* Cert No, Ref No */}
            <div className="row my-2">
                <Col>{ getTextField('certificateNo', 'Certificate No.')}</Col>
                <Col>{ getTextField('referenceNo', 'Reference No.')}</Col>
            </div>

            {/* Comment */}
            { getTextArea('comment', 'Comment', { placeholder: "Enter comment here"} ) }
        </div>

        <hr/>

        <div className='rounded bg-white shadow-sm p-3 mb-4'>
            {/* Start Date, Period */}
            <div className='row my-2'>
                <Col>{ getDatePicker('startDate', 'Start Date')}</Col>
                <Col>{ getNumberField('period', 'Period (Months)', 1, 100, 1, null, null)}</Col>
            </div>

            {/* Principal Amount, Interest Rate */}
            <div className='row my-2'>
                <Col>{ getNumberField('initialAmount', 'Principal Amount', { min: 0, step: 0.01, prefix: 'RM' }) }</Col>
                <Col>{ getNumberField('interestRate', 'Interest Rate', { min: 0, max: 100, step: 0.01, postfix: '%' } )}</Col>
            </div>


            {/* Interest Amount, Status (Not for editing, only display) */}
            <div className='row my-2'>
                <Col>
                    { getNumberField('interestAmount', 'Interest Amount', 
                        { 
                            min: 0, step: 0.01, prefix: 'RM', disabled: true,
                            children: <InputGroup.Button className='bg-primary text-white' onClick={calculateTotalInterest} >Kira</InputGroup.Button>
                        }
                    )}
                </Col>
                <Col>{ getTextField('status', 'Status', { disabled: true }) }</Col>
            </div>
        </div>

        



        {/* Button controls */}
        <ButtonToolbar className='d-flex justify-content-between flex-wrap'>
            <ButtonGroup className='my-2'>
                <Button size='lg' appearance="primary" type="submit" disabled={isDisableEditing} >
                    Submit <i className="fas fa-paper-plane"></i>
                </Button>
                <Button size='lg' appearance="primary" color='yellow' onClick={resetForm} disabled={!isDrafting} >
                    Clear <i className="fas fa-redo"></i>
                </Button>
                <Button size='lg' appearance="primary" color='violet' onClick={()=> navigate(`/fd`)} >
                    Back <i className="fas fa-angle-left"></i>
                </Button>
            </ButtonGroup>


            {/* If status is new, allow for approval/reject. Else, show deposit/withdrawal if approved, else simply delete btn */}
            <ButtonGroup className='my-2'>
            {/* Approve/Reject */}
            {
                (isNew && user?.role === ROLE.ROLE_ADMIN) &&
                <>
                    <Button size='lg' appearance="primary" color='green' onClick={()=> navigate(`/fd/approve/${id}`)} >
                        Approve <i className="fas fa-check"></i>
                    </Button>
                    <Button size='lg' appearance="primary" color='yellow' onClick={()=> navigate(`/fd/reject/${id}`)} >
                        Reject <i className="fas fa-times"></i>
                    </Button>
                </>
            }

            {/* Deposit/Withdrawal */}
            {
                isApproved &&
                <Button size='lg' appearance="primary" color='cyan' onClick={()=> navigate(`/fd/addition_withdraw/${id}`)} >Deposit/Withdrawal</Button>
            }

            {/* Delete */}
            {
                (isApproved || isRejected || isNew) &&
                <Button size='lg' appearance="primary" color='red' onClick={()=> navigate(`/fd/delete/${id}`) }>
                    Delete <i className="fas fa-trash"></i>
                </Button>
            }
            </ButtonGroup>
            
            {/* {
                (isNew)?
                <ButtonGroup className='my-2'>
                    <Button size='lg' appearance="primary" color='green' onClick={()=> navigate(`/fd/approve/${id}`)} >
                        Approve <i className="fas fa-check"></i>
                    </Button>
                    <Button size='lg' appearance="primary" color='yellow' onClick={()=> navigate(`/fd/reject/${id}`)} >
                        Reject <i className="fas fa-times"></i>
                    </Button>
                    <Button size='lg' appearance="primary" color='red' onClick={()=> navigate(`/fd/delete/${id}`) }>
                        Delete <i className="fas fa-trash"></i>
                    </Button>
                </ButtonGroup>
                : (isApproved || isRejected) &&
                <ButtonGroup className='my-2'>
                    {
                        isApproved &&
                        <Button size='lg' appearance="primary" color='cyan' onClick={()=> navigate(`/fd/addition_withdraw/${id}`)} >Deposit/Withdrawal</Button>
                    }
                    <Button size='lg' appearance="primary" color='red' onClick={()=> navigate(`/fd/delete/${id}`) }>
                        Delete <i className="fas fa-trash"></i>
                    </Button> 
                </ButtonGroup>
            } */}

            <ButtonGroup className='my-2'>
                <Button 
                    size='lg' appearance="primary" color='cyan'
                    disabled={ isDrafting } 
                    onClick={()=> navigate(`/fd/schedules/${id}`) }
                >
                    View Schedules <i className="fas fa-calendar-alt ms-2"></i>
                </Button>
            </ButtonGroup>

        </ButtonToolbar>
    </Form>
    );
}


export default FdForm;