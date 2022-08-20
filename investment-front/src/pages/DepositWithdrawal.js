import React, { useState, useContext, useEffect, useLayoutEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Pagination, Table } from 'rsuite';

import { AppContext } from '../AppContext';
import CurrencySpan from '../components/atomic/CurrencySpan';
import DepositWithdrawalForm from '../components/forms/form/DepositWithdrawalForm';
import { getUpsertView, getAdditions, getWithdrawals } from '../services/restServer';

const { Column, HeaderCell, Cell } = Table;




function DepositWithdrawal(props) {
    const { setCrumb, setDanger } = useContext(AppContext);
    const [ additionsPageData, setAdditionsPageData ] = useState(null);
    const [ withdrawalsPageData, setWithdrawalsPageData ] = useState(null);
    const [ additionsPageNo, setAdditionsPageNo ] = useState(1);
    const [ withdrawalsPageNo, setWithdrawalsPageNo ] = useState(1);
    const [ principalAmount, setPrincipalAmount ] = useState(0);
    // I simply want to use setUpdateState() to force the useEffect to run again from children elements
    // Simply toggle the flag and useEffect will be forced to run again
    const [ updateState, setUpdateState ] = useState(true);

    const { id } = useParams();


    // Fetch additions and withdrawals
    useEffect(()=> {
        getUpsertView({
            onSuccess: (data)=> setPrincipalAmount(data.initialAmount),
            onFailure: (e)=> setDanger(e.message),
            id
        });
    }, [id, updateState, setDanger]);

    useEffect(()=> {
        getAdditions({
            onSuccess: (data) => setAdditionsPageData(data),
            onFailure: (e) => setDanger(e.message),
            id,
            page: additionsPageNo,
        });
    }, [id, additionsPageNo, updateState, setDanger]);

    useEffect(()=> {
        getWithdrawals({
            onSuccess: (data) => setWithdrawalsPageData(data),
            onFailure: (e) => setDanger(e.message),
            id,
            page: withdrawalsPageNo,
        });
    }, [id, withdrawalsPageNo, updateState, setDanger]);


    // Set breadcrumb value
    useLayoutEffect(() => {
        setCrumb([{ name: props.route.name }]);
    }, [props.route.name, setCrumb]);



    return (
    <>
    <h4 className='lead text-center mb-5'>
        Principal Amount: <CurrencySpan className='fw-bold' value={principalAmount} />
    </h4>

    <div className='row justify-content-between'>
        <div className='col-md'>
            <h4 className='text-center mb-3'>Additions</h4>
            <Table
                loading={ additionsPageData === null }
                autoHeight
                data={additionsPageData?.content}
            >
                <Column width={50} align="center" fixed resizable >
                    <HeaderCell>#</HeaderCell>
                    <Cell className='fw-bold'>
                        { (rowData, i)=> <span>{ additionsPageData.pageable.offset + i + 1 }</span>}
                    </Cell>
                </Column>

                <Column width={150} flexGrow={1} >
                    <HeaderCell>Amount</HeaderCell>
                    <Cell className='text-success'>
                        { rowData => <CurrencySpan value={rowData.amount} /> }
                    </Cell>
                </Column>
            </Table>
            <Pagination
                className='justify-content-center mt-3'
                prev last next first
                total={ additionsPageData?.totalElements }
                limit={ additionsPageData?.size }
                activePage={ additionsPageData?.number + 1 }
                onChangePage={ setAdditionsPageNo }
            />
        </div>
        <div className='col-md'>
            <h4 className='text-center mb-3'>Withdrawals</h4>
            <Table
                loading={ withdrawalsPageData === null }
                autoHeight
                data={withdrawalsPageData?.content}
            >
                <Column width={50} align="center" fixed resizable >
                    <HeaderCell>#</HeaderCell>
                    <Cell className='fw-bold'>
                        { (rowData, i)=> <span>{ withdrawalsPageData.pageable.offset + i + 1 }</span>}
                    </Cell>
                </Column>

                <Column width={150} flexGrow={1} >
                    <HeaderCell>Amount</HeaderCell>
                    <Cell className='text-danger'>
                        { rowData => <CurrencySpan value={rowData.amount} /> }
                    </Cell>
                </Column>
            </Table>
            <Pagination
                className='justify-content-center mt-3'
                prev last next first
                total={ withdrawalsPageData?.totalElements }
                limit={ withdrawalsPageData?.size }
                activePage={ withdrawalsPageData?.number + 1 }
                onChangePage={ setWithdrawalsPageNo }
            />
        </div>
    </div>

    <DepositWithdrawalForm fixedDepositId={id} updateParent={setUpdateState} />
    </>
    );
}



export default DepositWithdrawal;