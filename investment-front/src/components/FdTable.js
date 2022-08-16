
import React from 'react';
import { Link } from 'react-router-dom';

import { Table } from 'rsuite';

import CurrencySpan from './atomic/CurrencySpan';


const { Column, HeaderCell, Cell } = Table;

// Get status text span, with color formatting
function getStatusSpan(value) {
    const className = 
        value === 'APPROVED' ? 'text-success' :
        value === 'REJECT' ? 'text-danger':
        'text-primary';

    return <span className={className}>{value}</span>;
}


// Get redirection link to view details or edit the fixed deposit
function getLinkButton(id) {
    return <Link to={`/fd/${id}`} className="text-decoration-none">Edit</Link>;
}


function FdTable({ loading, data }) {
    return (
        <Table
            className='mb-4'
            loading={loading}
            autoHeight
            data={data.content}
        >

            <Column width={30} align="center" fixed resizable >
                <HeaderCell>#</HeaderCell>
                <Cell className='fw-bold'>
                    { (rowData, i)=> <span>{ data.pageable.offset + i + 1 }</span>}
                </Cell>
            </Column>

            <Column width={200} resizable >
                <HeaderCell>Name</HeaderCell>
                <Cell dataKey="name" />
            </Column>

            <Column width={100} resizable >
                <HeaderCell>Status</HeaderCell>
                <Cell>
                    { rowData => getStatusSpan(rowData.status) }
                </Cell>
            </Column>
            
            <Column width={150} resizable >
                <HeaderCell>Principal Amount</HeaderCell>
                <Cell>
                    { rowData => <CurrencySpan className='text-info' value={rowData.principalAmount} /> }
                </Cell>
            </Column>
            
            <Column width={150} resizable >
                <HeaderCell>Interest Amount</HeaderCell>
                <Cell>
                    { rowData => <CurrencySpan className='text-success' value={rowData.interestAmount} /> }
                </Cell>
            </Column>
            
            <Column width={100} resizable >
                <HeaderCell>Start Date</HeaderCell>
                <Cell dataKey="startDate" />
            </Column>

            <Column width={100} resizable >
                <HeaderCell>End Date</HeaderCell>
                <Cell dataKey="endDate" />
            </Column>

            <Column width={150} resizable >
                <HeaderCell>Bank</HeaderCell>
                <Cell dataKey="bank" />
            </Column>

            <Column width={150} resizable >
                <HeaderCell>Total Additions</HeaderCell>
                <Cell>
                    { rowData => <CurrencySpan className='text-success' value={rowData.totalAddition} /> }
                </Cell>
            </Column>

            <Column width={150} resizable >
                <HeaderCell>Total Withdrawals</HeaderCell>
                <Cell>
                    { rowData => <CurrencySpan className='text-danger' value={rowData.totalWithdrawal} /> }
                </Cell>
            </Column>


            <Column width={45} flexGrow={1} fixed="right">
                <HeaderCell></HeaderCell>
                <Cell>
                    { rowData => getLinkButton(rowData.id) }
                </Cell>
            </Column>
        </Table>
    );
}


export default FdTable;