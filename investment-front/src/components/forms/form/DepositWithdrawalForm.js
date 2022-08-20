import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, ButtonGroup, Form } from 'rsuite';


import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import RadioSelect from '../input_components/RadioSelect';
import NumberInput from '../input_components/NumberInput';
import { postAddition, postWithdrawal } from '../../../services/restServer';
import { AppContext } from '../../../AppContext';



const TYPE_OPTIONS = {
    ADDITION: "ADDITION",
    WITHDRAWAL: "WITHDRAWAL",
}

const schema = Yup.object({
    type: Yup.string().required("Required").oneOf( Object.values(TYPE_OPTIONS) ),
    amount: Yup.number().required("Required").min(0),
});

const defaultValues = {
    type: TYPE_OPTIONS.ADDITION,
    amount: 0,
};



function DepositWithdrawalForm(props) {
    const { fixedDepositId, updateParent } = props;
    const { setDanger, setSuccess, setInfo } = useContext(AppContext);
    
    const navigate = useNavigate();

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues,
        resolver: yupResolver(schema),
    });


    function submitHandler({ type, amount }) {
        const handler = type === TYPE_OPTIONS.ADDITION ? postAddition : postWithdrawal;

        handler({
            onInit: () => setInfo("Submitting..."),
            onSuccess: () => {
                setSuccess(`Successfully performed ${type.toLowerCase()}: RM${amount}`);
                updateParent(flag => !flag);
            },
            onFailure: (e) => setDanger(e.message),
            onFinal: ()=> window.scrollTo(0, 0),
            fixedDepositId,
            amount,
        });
    }




    return (
    <Form fluid className='card mt-5 m-auto p-3 rounded shadow-sm' style={{ maxWidth: '400px'}}
        onSubmit={ handleSubmit(submitHandler) }
    >
        <h4 className='text-center fw-bold mb-4 lead'>Make Addition/Withdrawal</h4>

        <RadioSelect
            control={control}
            name='type'
            label='Type'
            error={errors.type?.message}
            values={[
                { value: TYPE_OPTIONS.ADDITION, label: "Addition" },
                { value: TYPE_OPTIONS.WITHDRAWAL, label: "Withdrawal" },
            ]}
        />

        <NumberInput
            control={control}
            name='amount'
            label='Amount'
            error={errors.amount?.message}
            required
            prefix='RM'
            min={0} step={0.01}
        />


        <ButtonGroup className='m-auto'>
            <Button appearance='primary' size='lg' type='submit'>
                Submit
            </Button>
            <Button appearance='primary' size='lg' color='yellow' onClick={ ()=> navigate(`/fd/${fixedDepositId}`) }>
                Back
            </Button>
        </ButtonGroup>
    </Form>
    );
}



export default DepositWithdrawalForm;