import React, { useState, useContext, useEffect, useLayoutEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Pagination, Button, ButtonGroup } from 'rsuite';

import { AppContext } from '../AppContext';
import ScheduleTable from '../components/table/ScheduleTable';
import { getSchedules } from '../services/restServer';



function FdList(props) {
    const { setCrumb, setDanger } = useContext(AppContext);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ pageData, setPageData ] = useState({});
    const [ pageNo, setPageNo ] = useState(1);
    const [ pageSize, setPageSize ] = useState(10);

    const { id } = useParams();
    const navigate = useNavigate();


    // Fetch page lists
    useEffect(()=> {
        getSchedules({
            onInit: () => setDanger(null),
            onSuccess: (data) => setPageData(data),
            onFailure: (e) => {
                setDanger(e.message + ". See console for more info.");
                setIsLoading(false);
            },
            onFinal: () => setIsLoading(false),
            page: pageNo,
            pageSize: pageSize,
            id
        });
    }, [id, pageNo, pageSize, setDanger]);


    // Set breadcrumb value
    useLayoutEffect(() => {
        setCrumb([{ name: props.route.name }]);
    }, [props.route.name, setCrumb]);

    
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
        </div>

        <ScheduleTable loading={isLoading} data={pageData} />

        <Pagination
            className='justify-content-center mt-3'
            prev last next first
            size="md"
            total={ pageData.totalElements }
            limit={ pageData.size }
            activePage={ pageData.number + 1 }
            onChangePage={ setPageNo }
        />

        <Button appearance='primary' size='lg' onClick={()=> navigate(`/fd/${id}`)}>Back</Button>
    </>
    );
}



export default FdList;