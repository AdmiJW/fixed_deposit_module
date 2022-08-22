import React, { useState, useContext, useLayoutEffect, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, ButtonGroup } from 'rsuite';

import { AppContext } from "../AppContext";
import LoadingScreen from '../components/screen/LoadingScreen';
import { getUpsertView } from '../services/getAPI';
import { postAcceptReject } from '../services/postAPI';
import CurrencySpan from '../components/atomic/CurrencySpan';






export default function AcceptReject(props) {
    const { mode } = props;

    const { setCrumb, setDanger, setInfo, setSuccess } = useContext(AppContext);
    const [ loading, setLoading ] = useState(false);
    const [ submitted, setSubmitted ] = useState(false);
    const [ data, setData ] = useState({});

    const { id } = useParams();
    const navigate = useNavigate();


    // Request from server if the progress is in LOADING state
    useEffect(()=> {
        getUpsertView({
            onInit: () => { 
                setLoading(true); 
                setSuccess(null);
            },
            onSuccess: (data) => { setData(data); },
            onFailure: (e) => { setDanger(e.message); },
            onFinal: () => { setLoading(false); },
            id
        });
    }, [id, setDanger, setSuccess]);


    // Submit handler
    function onSubmit() {
        setSubmitted(true);
        postAcceptReject({
            onInit: () => { 
                setInfo("Submitting...");
                setSubmitted(true);
            },
            onSuccess: () => setSuccess('Successful'),
            onFailure: (e) => { 
                setDanger(e.message); 
                setSubmitted(false);
            },
            id,
            mode,
        });
    }

    function onBack() {
        navigate('/fd/' + id);
    }


    // Set breadcrumb value
    useLayoutEffect(() => {
        setCrumb([{ name: props.route.name }]);
    }, [props.route.name, setCrumb]);



    if (loading) return <LoadingScreen text="Retrieving fixed deposit info..." />

    return (
        <div className="text-center mt-4 mb-4">

            {/* Title */}
            {
                mode === 'APPROVE' 
                ? <div className="fs-4 fw-bold">Approve Fixed Deposit</div>
                : <div className="fs-4 fw-bold">Reject Fixed Deposit</div>
            }

            {/* Details */}
            <div className='card rounded text-start shadow-sm my-4 mx-auto' style={{ maxWidth: '500px'}}>
                <div className="card-body">
                    <h5 className="card-title mb-4">{ data.name }</h5>
                    <p className="card-text">
                        Principal Amount: <CurrencySpan className='fw-bold' value={data.initialAmount} />
                    </p>
                    <p className="card-text">Interest Rate: <b>{data.interestRate?.toFixed(2)}%</b></p>
                    <p className="card-text">Start Date: <b>{data.startDate}</b></p>
                    <p className="card-text">Registrant: <b>{data.registeredBy}</b> on {data.registeredDate}</p>
                </div>
            </div>

            
            {
                mode === 'APPROVE'
                ? <div className="my-3 lead">Approve this FD?</div>
                : <div className="my-3 lead">Reject this FD?</div>
            }
            <ButtonGroup>
                {
                    mode === 'APPROVE'
                    ? 
                    <Button size='lg' appearance="primary" color='green' disabled={submitted} onClick={onSubmit} >
                        Confirm <i className="fas fa-check"></i>
                    </Button>
                    :
                    <Button size='lg' appearance="primary" color='red' disabled={submitted} onClick={onSubmit} >
                        Confirm <i className="fas fa-check"></i>
                    </Button>
                }
                <Button size='lg' appearance="primary" color='cyan' onClick={onBack} >
                    Back <i className="fas fa-arrow-alt-left"></i>
                </Button>
            </ButtonGroup>
        </div>
    );
}
