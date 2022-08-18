
function toCurrency(value) {
    return value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}



function createCell(data) {
    const cell = document.createElement('td');
    cell.innerText = data;
    return cell;
}

function createRow( fixedDeposit, i ) {
    const row = document.createElement('tr');
    row.appendChild( createCell(i) );
    row.appendChild( createCell(fixedDeposit.name) );
    row.appendChild( createCell(fixedDeposit.referenceNo) );
    row.appendChild( createCell(fixedDeposit.certificateNo) );
    row.appendChild( createCell('RM' + toCurrency(fixedDeposit.initialAmount) ) );
    row.appendChild( createCell( toCurrency(fixedDeposit.interestRate ) + "%" ) );
    return row;
}



document.addEventListener('DOMContentLoaded', ()=> {
    const tbody = document.querySelector('tbody');

    const data = JSON.parse( document.getElementById('data').innerHTML );
    data.forEach((fd, i)=> tbody.appendChild( createRow(fd, i+1) ));
});