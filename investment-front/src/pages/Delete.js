import React, { useState, useContext, useLayoutEffect, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from 'rsuite';

import { AppContext } from "../AppContext";
import LoadingScreen from '../components/screen/LoadingScreen';
import SimpleMessageScreen from '../components/screen/SimpleMessageScreen';
import { deleteFd } from '../services/restServer';



const DELETE_STATE = {
    AWAIT_CONFIRMATION: 'AWAIT_CONFIRMATION',
    LOADING: 'LOADING',
    SUCCESS: 'SUCCESS',
    FAILURE: 'FAILURE',
};



export default function Delete(props) {
    const { setCrumb } = useContext(AppContext);
    const [ progress, setProgress ] = useState(DELETE_STATE.AWAIT_CONFIRMATION);
    const [ data, setData ] = useState(null);

    const { id } = useParams();

    const backBtn = (
        <Link to={`/fd${ progress === DELETE_STATE.SUCCESS? '': `/${id}` }`}>
            <Button appearance='primary' size='lg'>Back</Button>
        </Link>
    );


    // Request from server if the progress is in LOADING state
    useEffect(()=> {
        if (progress !== DELETE_STATE.LOADING) return;

        deleteFd({
            onSuccess: (data) => {
                setProgress(DELETE_STATE.SUCCESS);
                setData(data);
            },
            onFailure: (data) => {
                setProgress(DELETE_STATE.FAILURE);
                setData(data.message);
            },
            id
        });
    }, [id, progress]);


    // Set breadcrumb value
    useLayoutEffect(() => {
        setCrumb([{ name: props.route.name }]);
    }, [props.route.name, setCrumb]);




    return (<>
    {
        progress === DELETE_STATE.AWAIT_CONFIRMATION ? (

            <div className="text-center mt-4 mb-4">
                <i className="fas fa-exclamation-triangle fs-1 text-warning"></i>
                <p className='my-4 text-danger lead fw-bold'>Are you sure you want to delete Fixed Deposit #{id}? This action is irreversible!</p>
                
                <Button className='me-3' appearance='primary' size='lg' color='red' 
                    onClick={()=> setProgress(DELETE_STATE.LOADING)}
                >
                    Delete
                </Button>
                
                {backBtn}
            </div>

        ) : progress === DELETE_STATE.LOADING ? (

            <LoadingScreen text={"Deleting..."} />

        ) : progress === DELETE_STATE.SUCCESS ? (

            <SimpleMessageScreen
                icon={["fas", "fa-check-circle", 'text-success']}
                message={`Deleted FD #${id} successfully!`}
                links={backBtn}
            />

        ) : progress === DELETE_STATE.FAILURE ? (

            <SimpleMessageScreen
                icon={["fas", "fa-exclamation-circle", 'text-danger']}
                message={`Failed to delete FD #${id}: ${data}`}
                links={backBtn}
            />
            
        ) : null
    }
    </>)
}
