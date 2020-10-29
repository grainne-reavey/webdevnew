import React from 'react'

//Creates a react component "Datatable" which takes our data state as its prop argument
export default function Datatable({ data }) {
    //This defines our columns to be the keys of our result data (the columns of the query result e.g sym,price etc)
    const columns =data[0] && Object.keys(data[0]);
    return (
        //Defines the amount of cell Padding and cell Spacing and creates our table header and table body. The keys are mapped to the header and the
        //data to the table body
        <table cellPadding={0} cellSpacing={0}>
            <thead>
                 <tr>{data[0] && columns.map((heading) =><th>{heading}</th>)}</tr>
            </thead>
            <tbody>
                {data.map(row => <tr>
                    {
                        columns.map(column => <td>{row[column]}</td>)
                    }

                </tr>)}
            </tbody>
        </table>
    ); 
}