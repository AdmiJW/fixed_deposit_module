import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, ButtonGroup, Form, Radio, RadioGroup, InputNumber } from 'rsuite';

import { postAddition, postWithdrawal } from '../../services/restServer';
import { AppContext } from '../../AppContext';





function DepositWithdrawalForm(props) {
    const { setDanger, setSuccess, setInfo } = useContext(AppContext);
    const [ type, setType ] = useState("ADDITION");
    const [ amount, setAmount ] = useState(0);

    const { fixedDepositId, updateParent } = props;
    const navigate = useNavigate();


    function handleSubmit() {
        const handler = type === "ADDITION" ? postAddition : postWithdrawal;
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
    <Form fluid className='card mt-5 m-auto p-3 rounded shadow-sm' style={{ maxWidth: '500px'}}
        onSubmit={null}
    >
        <h4 className='text-center fw-bold mb-3 lead'>Make Addition/Withdrawal</h4>

        <RadioGroup name="type" className='justify-content-center mb-3' inline value={type}
            onChange={setType}   
        > 
            <Radio value="ADDITION">Addition</Radio>
            <Radio value="WITHDRAWAL">Withdrawal</Radio>
        </RadioGroup>

        <Form.Group className='text-center'>
            <Form.ControlLabel>Amount</Form.ControlLabel>
            <InputNumber
                required
                className='m-auto'
                name='amount'
                prefix='RM'
                min={0} step={0.01}
                onChange={setAmount}
                value={amount}
            />
        </Form.Group>

        <ButtonGroup className='m-auto'>
            <Button appearance='primary' size='lg' onClick={handleSubmit}>
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