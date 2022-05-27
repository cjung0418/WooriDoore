import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(title, price, amount, total) {
  return { title, price, amount, total };
}

const dummyFundedData= [
  {title:"옵션1", price:30000, amount:10}, 
  {title:"옵션2", price:40000, amount:5},
  {title:"옵션3", price:50000, amount:2}
]

const rows = dummyFundedData.map(data=> createData(data.title,data.price,data.amount,data.price*data.amount));


export default function OnFundingTable() {
  
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>상품구성</TableCell>
            <TableCell align="right">상품 구성당 금액</TableCell>
            <TableCell align="right">해당 상품 구매 인원</TableCell>
            <TableCell align="right">상품 구성당 총 금액</TableCell>            
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.title}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>
              <TableCell align="right">{row.total}</TableCell>              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}