
import React from 'react';

import { Table } from 'rsuite';
import CurrencySpan from './atomic/CurrencySpan';

const { Column, HeaderCell, Cell } = Table;




function ScheduleTable({ loading, data }) {
    return (
        <Table
            className='mb-4'
            loading={loading}
            autoHeight
            data={data.content}
        >

            <Column width={50} align="center" fixed resizable >
                <HeaderCell>#</HeaderCell>
                <Cell className='fw-bold'>
                    { (_, i)=> <span>{ data.pageable.offset + i + 1 }</span>}
                </Cell>
            </Column>

            <Column width={150} resizable >
                <HeaderCell>Date Start</HeaderCell>
                <Cell dataKey="dateStart" />
            </Column>

            <Column width={150} resizable >
                <HeaderCell>Date End</HeaderCell>
                <Cell dataKey="dateEnd" />
            </Column>

            <Column width={150} resizable >
                <HeaderCell>Start Amount</HeaderCell>
                <Cell>
                    { rowData => <CurrencySpan value={rowData.amountStart} /> }
                </Cell>
            </Column>

            <Column width={150} resizable >
                <HeaderCell>End Amount</HeaderCell>
                <Cell>
                    { rowData => <CurrencySpan value={rowData.amountEnd} /> }
                </Cell>
            </Column>

            <Column width={150} flexGrow={1}  >
                <HeaderCell>Earnings</HeaderCell>
                <Cell>
                    { rowData => <CurrencySpan value={rowData.amountEnd - rowData.amountStart} /> }
                </Cell>
            </Column>
        </Table>
    );
}


export default ScheduleTable;