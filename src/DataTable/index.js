import React from 'react'
import './index.css';
//import Table from '@material-ui/core/Table'; 
//import TableBody from '@material-ui/core/TableBody'; 
//import TableCell from '@material-ui/core/TableCell'; 
//import TableHead from '@material-ui/core/TableHead'; 
//import TableRow from '@material-ui/core/TableRow'; 
//import { makeStyles } from '@material-ui/core/styles';
//import Paper from '@material-ui/core/Paper';
//import { TableContainer } from '@material-ui/core';
import { Table } from 'react-bootstrap'

/*
const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });
*/
//Creates a react component "Datatable" which takes our data state as its prop argument
export default function Datatable({ data }) {
    //This defines our columns to be the keys of our result data (the columns of the query result e.g sym,price etc)
    //const classes = useStyles();
    
    //const columns =data[0] && Object.keys(data[0]);
    return (

        //Defines the amount of cell Padding and cell Spacing and creates our table header and table body. The keys are mapped to the header and the
        //data to the table body
     //<TableContainer component={Paper} >
        <Table cellPadding={5} cellSpacing={0}
        >
            <thead>
                <tr> 
                        <th>
                            Sym
                        </th>
                        <th>
                            Price
                        </th>
                        <th>
                            Change(%)
                        </th>

                </tr>
            </thead>
            <tbody>
            { (data.length > 0) ? data.map( (data, sym) => {
           return (
            <tr key={ sym }>
              <td>{ data.sym }</td>
              <td>${ data.price.toFixed(2) }</td>
              {data.diff < 0 ? (
                <td className='coin-percent red'>{data.diff.toFixed(2)}%</td>
                ) : (
                <td className='coin-percent green'>{data.diff.toFixed(2)}%</td>
                )}
            </tr>
          )
         }) : <tr><td colSpan="5">Loading...</td></tr> }
            </tbody>
        </Table>
     //</TableContainer>
    ); 
}