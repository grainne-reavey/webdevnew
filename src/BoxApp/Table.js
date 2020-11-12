import React from 'react'
import { Table } from 'react-bootstrap'

function nFormatter(num, digits) {
    var si = [
        { value: 1, symbol: "" },
        { value: 1E3, symbol: " k" },
        { value: 1E6, symbol: " Million" },
        { value: 1E9, symbol: " G" },
        { value: 1E12, symbol: " Trillion" },
        { value: 1E15, symbol: " P" },
        { value: 1E18, symbol: " E" }
    ];
    var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var i;
    for (i = si.length - 1; i > 0; i--) {
        if (num >= si[i].value) {
            break;
        }
    }
    return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
}

export default function TableData({ data }) {
    return (
        <div>
            <Table cellPadding={0} cellSpacing={0} striped bordered hover>
                
                <thead>
                    <tr class="d-flex" align="center" >
                        <th class="col-4" >
                            Highest Traded Sym
                    </th>
                        <th class="col-4">
                            Total Volume
                    </th>
                        <th class="col-4">
                            Rounded Volume
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {(data.length > 0) ? data.map((data, sym) => {
                        return (
                            <tr class="d-flex" key={sym}>
                                <td class="col-4" >{data.sym}</td>
                                <td class="col-4">{data.totalvol}</td>
                                <td class="col-4">{nFormatter(data.totalvol, 2)}</td>
                            </tr>


                        )
                    }) : <tr><td colSpan="5" align="center">Loading...</td></tr>}
                </tbody>
            </Table>
        </div>

    );
}