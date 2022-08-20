import React, { useContext, useCallback, useState, useLayoutEffect, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { AppContext } from '../AppContext';
import { getUpsertView, postUpsert, getInterestAmount } from '../services/restServer';
import LoadingScreen from "../components/screen/LoadingScreen";
import FdForm from "../components/forms/form/FdForm";

import FdStatus from "../interfaces/FdStatus";


// Form initial values
const defaultValues = {
    // Id. Required to update existing record.
    id: null,
    
    // Form Group 1 - Registration
    name: '',
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

    // Form Group 3 - Detail for display only
    interestAmount: 0,
    status: FdStatus.DRAFTING,
};
// Validation schema of form
const schema = Yup.object({
    name: Yup.string().required('Required'),
    registeredDate: Yup.date().required('Required'),
    bank: Yup.string().required('Required'),
    certificateNo: Yup.string().required('Required'),
    referenceNo: Yup.string().required('Required'),
    comment: Yup.string(),
    startDate: Yup.date().required('Required'),
    period: Yup.number().min(1, 'Minimum must be 1 month').required('Required'),
    initialAmount: Yup.number().min(0, 'Principal amount cannot be negative').required('Required'),
    interestRate: Yup.number().min(0, 'Interest rate cannot be negative').max(100, 'Interest rate cannot exceed 100%').required('Required'),

    interestAmount: Yup.number(),
    status: Yup.string().oneOf(Object.values(FdStatus), 'Invalid status'),
});




function FdDetails(props) {
    const { setCrumb, setDanger, setSuccess, setInfo } = useContext(AppContext);
    const [ isLoading, setIsLoading ] = useState(false);
    const { id } = useParams();


    // Form handler 
    const { control, handleSubmit, formState: { errors }, reset, setValue, watch, getValues } = useForm({
        defaultValues,
        resolver: yupResolver(schema),
    });



    // Submit handler
    function submitHandler(formData) {
        // Data that shouldn't be sent to server
        delete formData['status'];
        delete formData['interestAmount'];

        postUpsert({
            formData,
            onInit: () => {
                setInfo('Submitting data...');
                window.scrollTo(0, 0);
            },
            onSuccess: (data) => {
                Object.entries(data).forEach( ([key, value]) => setValue(key, value) );
                setValue('startDate', new Date(data.startDate));
                setValue('registeredDate', new Date(data.registeredDate));
                setSuccess('Data submitted successfully.');
            },
            onFailure: (err) => setDanger(err.message || "Failed to submit fixed deposit data"),
            onFinal: () => setIsLoading(false)
        });
    }


    // Form reset handler 
    const resetHandler = useCallback(() => {
        setDanger(null);
        reset(defaultValues);
    }, [reset, setDanger]);


    // Calculate interest from server
    function calculateTotalInterest() {
        getInterestAmount({
            onSuccess: (data) => setValue("interestAmount", data.interest),
            onFailure: (err) => {
                setDanger("Failed to calculate interest amount: " + err.message);
                window.scrollTo(0, 0);
            },
            principalAmount: getValues('initialAmount'),
            interestRate: getValues('interestRate'),
            period: getValues('period'),
        });
    }


    // Get data from server when id is provided
    useEffect(() => {
        resetHandler();
        if (!id) return;
        
        getUpsertView({
            id,
            onInit: ()=> {
                setDanger(null);
                resetHandler();
            },
            onLoading: ()=> setIsLoading(true),
            onSuccess: (data) => {
                Object.entries(data).forEach(([key, value]) => setValue(key, value) );
                setValue('startDate', new Date(data.startDate));
                setValue('registeredDate', new Date(data.registeredDate));
            },
            onFailure: (err) => setDanger(err.message || "Failed to retrieve fixed deposit data"),
            onFinal: ()=> setIsLoading(false),
        });
    }, [id, setDanger, resetHandler, setValue]);



    // Set breadcrumb value
    useLayoutEffect(() => {
        setCrumb([{ name: props.route.name }]);
    }, [props.route.name, setCrumb]);



    if (isLoading) return <LoadingScreen text='Retrieving Fixed Deposit Information...' />;

    return <>
        <h4 className="mb-3">{props.route.name} 🖊️</h4>
        <FdForm
            control={control}
            handleSubmit={handleSubmit(submitHandler)}
            errors={errors}
            
            status={watch('status')}
            id={watch('id')}
            interest={watch('interestAmount')}

            calculateTotalInterest={calculateTotalInterest}
            resetForm={resetHandler}
        />
    </>
}


export default FdDetails;