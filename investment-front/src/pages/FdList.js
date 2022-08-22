import React, { useState, useContext, useEffect, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { Pagination, Button, ButtonGroup } from 'rsuite';

import { AppContext } from '../AppContext';
import SimpleMessageScreen from '../components/screen/SimpleMessageScreen';
import FdTable from '../components/table/FdTable';
import { getListView } from '../services/getAPI';



function FdList(props) {
    const { setCrumb, setDanger, user } = useContext(AppContext);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ pageData, setPageData ] = useState({});
    const [ pageNo, setPageNo ] = useState(1);
    const [ pageSize, setPageSize ] = useState(10);
    const [ status, setStatus ] = useState('');


    // Fetch page lists
    useEffect(()=> {
        if (!user) return;

        getListView({
            onInit: () => setDanger(null),
            onSuccess: (data) => setPageData(data),
            onFailure: (e) => {
                setDanger(e.message + ". See console for more info.");
                setIsLoading(false);
            },
            onFinal: () => setIsLoading(false),
            page: pageNo,
            pageSize: pageSize,
            status: status,
        });
    }, [pageNo, pageSize, status, setDanger, user]);


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