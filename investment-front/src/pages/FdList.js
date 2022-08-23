import React, { useState, useContext, useEffect, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { Pagination, Button, ButtonGroup, Form } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
import { useForm } from 'react-hook-form';

import { AppContext } from '../AppContext';
import TextInput2 from '../components/forms/input_components/TextInput2';
import SimpleMessageScreen from '../components/screen/SimpleMessageScreen';
import FdTable from '../components/table/FdTable';
import { getListView } from '../services/getAPI';
import Col from '../components/atomic/Col';


const defaultValues = {
    registrantSearch: '',
    fdNameSearch: ''
};



function FdList(props) {
    const { setCrumb, setDanger, user } = useContext(AppContext);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ pageData, setPageData ] = useState({});
    const [ pageNo, setPageNo ] = useState(1);
    const [ pageSize, setPageSize ] = useState(10);
    const [ status, setStatus ] = useState('');
    const [ fdName, setFdName ] = useState('');
    const [ registrant, setRegistrant ] = useState('');

    const { control, handleSubmit, reset } = useForm({ defaultValues });


    const submitHandler = ({ registrantSearch, fdNameSearch }) => {
        setRegistrant(registrantSearch);
        setFdName(fdNameSearch);
        setPageNo(1);
    }

    const resetHandler = () => {
        reset(defaultValues);
        submitHandler(defaultValues);
    };


    // Fetch page lists
    useEffect(()=> {
        getListView({
            onInit: () => setDanger(null),
            onSuccess: (data) => setPageData(data),
            onFailure: (e) => {
                setDanger(e.message);
                setIsLoading(false);
            },
            onFinal: () => setIsLoading(false),
            page: pageNo,
            pageSize: pageSize,
            status: status,
            fdName: fdName,
            registrantName: registrant
        });
    }, [pageNo, pageSize, status, setDanger, fdName, registrant]);


    // Set breadcrumb value
    useLayoutEffect(() => {
        setCrumb([{ name: props.route.name }]);
    }, [props.route.name, setCrumb]);



    // Not logged in
    if (!user) return (
        <SimpleMessageScreen 
            icon={['fas', 'fa-exclamation-circle', 'text-danger']}
            message="Please login first to view fixed deposits"
            links={ <Link to="/login" className="btn btn-primary text-decoration-none">Login</Link> }
        />
    );
    
    return (
    <>
        {/* Search fields */}
        <Form className='row my-3' onSubmit={handleSubmit(submitHandler)}>
            <Col className='mt-2'>
                <TextInput2
                    name="registrantSearch"
                    control={control}
                    placeholder="Search registrant"
                    button={<SearchIcon />}
                    buttonProps={{ type: 'submit' }}
                />
            </Col>
            <Col className='mt-2'>
                <TextInput2
                    name="fdNameSearch"
                    control={control}
                    placeholder="Search Fixed Deposit"
                    button={<SearchIcon />}
                    buttonProps={{ type: 'submit' }}
                />
            </Col>
        </Form>

        <div className='text-end'>
            <Button appearance='primary' color='violet' onClick={resetHandler}>
                Reset <i className='fa fa-refresh px-1'></i>
            </Button>
        </div>


        {/* Buttons for page size and sorting order */}
        <div className='d-flex justify-content-between align-items-center'>
            <div className='d-flex gap-2 my-3 align-items-center'>
                <span className='fs-7'>Show</span>
                <ButtonGroup>
                    <Button appearance='primary' size='sm' color='violet' onClick={()=> setPageSize(5) } active={pageSize === 5}>5</Button>
                    <Button appearance='primary' size='sm' color='violet' onClick={()=> setPageSize(10) } active={pageSize === 10}>10</Button>
                    <Button appearance='primary' size='sm' color='violet' onClick={()=> setPageSize(20) } active={pageSize === 20}>20</Button>
                </ButtonGroup>
            </div>

            <div className='d-flex gap-2 my-3 align-items-center'>
                <ButtonGroup>
                    <Button appearance='primary' color='violet' title='All' onClick={()=> setStatus("") } active={status === ''}><i className="fas fa-asterisk"></i></Button>
                    <Button appearance='primary' color='violet' title='New' onClick={()=> setStatus("NEW") } active={status === 'NEW'}><i className="fas fa-clock"></i></Button>
                    <Button appearance='primary' color='violet' title='Approved' onClick={()=> setStatus("APPROVED") } active={status === 'APPROVED'}><i className="fas fa-check"></i></Button>
                    <Button appearance='primary' color='violet' title='Rejected' onClick={()=> setStatus("REJECT") } active={status === 'REJECTED'}><i className="fas fa-times"></i></Button>
                </ButtonGroup>
            </div>
        </div>

        <FdTable loading={isLoading} data={pageData} />

        <Pagination
            className='justify-content-center mt-3'
            prev last next first
            size="md"
            total={ pageData.totalElements }
            limit={ pageData.size }
            activePage={ pageData.number + 1 }
            onChangePage={ setPageNo }
        />
    </>
    );
}



export default FdList;