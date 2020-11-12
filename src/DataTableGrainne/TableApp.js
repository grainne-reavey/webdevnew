import React, { useState, useEffect } from 'react'
import axios from 'axios'
import EnhancedTableToday from './TableListToday';
import './index.css';
import EnhancedTableYesterday from './TableListYesterday';
import EnhancedTableEreYesterday from './TableListEreYesterday';
import {Tab, Tabs} from 'react-bootstrap';

/**
 * Make Axios based request.
 * @param method - defaults to 'get'
 * @param [data] - optional
 * @param url
 * @param additionalHeaders
 * @param rest - optional. Additional properties to pass into request config
 * @returns {Promise<any>}
 */
const makeRequest = ({
    data,
    method = 'get',
    url,
    headers = {},
    auth,
    ...rest
}) => {
    const config = {
        ...(data ? { data } : {}), // Do not add 'data' if undefined.
        method,
        url,
        headers,
        auth,
        ...rest,
    };
    return new Promise((resolve, reject) => {
        axios.request(config)
            .then(response => resolve(response))
            .catch(error => console.log(error));
    });
};

function TableAppToday() {

    const [tableDataToday, setTableData] = useState([]);

    const processRequest = async setTableData => {
        const { data } = await makeRequest({
            url: 'https://81.150.99.19:8037/executeQuery',
            method: 'POST',
            headers: {
                "Accept": "*/*",
                "Authorization": "BASIC dXNlcjpwYXNz"
            },
            auth: {
                username: 'user',
                password: 'pass'
            },
            data: {
                //Specify your query here
                "query": "select price:last price, diff:last(deltas(price)),maxPrice:max price, minPrice:min price by sym from trade where time.date =.z.d",
                "type": "sync",
                "response": true
            },
        });

        setTableData(data.result);
        console.log(data);
    }
    useEffect(() => {
        processRequest(setTableData)

    });

    console.log(tableDataToday)

    return (
        <EnhancedTableToday data={tableDataToday} />
    );
}

function TableAppYesterday() {

    const [tableDataYesterday, setTableData] = useState([]);

    const processRequest = async setTableData => {
        const { data } = await makeRequest({
            url: 'https://81.150.99.19:8037/executeQuery',
            method: 'POST',
            headers: {
                "Accept": "*/*",
                "Authorization": "BASIC dXNlcjpwYXNz"
            },
            auth: {
                username: 'user',
                password: 'pass'
            },
            data: {
                //Specify your query here
                "query": "select openPrice:first price, closePrice:last price,maxPrice:max price, minPrice:min price, diff: (first price) - last price by sym from trade where time.date =(.z.d-1)",
                "type": "sync",
                "response": true
            }
        });

        setTableData(data.result);
        console.log(data);
    }
    useEffect(() => {
        processRequest(setTableData)
    });
    console.log(tableDataYesterday)
    return (

        <EnhancedTableYesterday data={tableDataYesterday} />
    );
}

function TableAppEreYesterday() {

    const [tableDataEreYesterday, setTableData] = useState([]);

    const processRequest = async setTableData => {
        const { data } = await makeRequest({
            url: 'https://81.150.99.19:8037/executeQuery',
            method: 'POST',
            headers: {
                "Accept": "*/*",
                "Authorization": "BASIC dXNlcjpwYXNz"
            },
            auth: {
                username: 'user',
                password: 'pass'
            },
            data: {
                //Specify your query here
                "query": "select openPrice:first price, closePrice:last price,maxPrice:max price, minPrice:min price by sym from trade where time.date =(.z.d-2)",
                "type": "sync",
                "response": true
            }
        });

        setTableData(data.result);
        console.log(data);
    }
    useEffect(() => {
        processRequest(setTableData)
    });
    console.log(tableDataEreYesterday)
    return (

        <EnhancedTableEreYesterday data={tableDataEreYesterday} />
    );
}



class TableApp extends React.Component {

    constructor() {
        super();
        this.state = {

        };

    }

    render() {
        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        var today = new Date();
        var yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1)
        var ereyesterday = new Date(yesterday);
        ereyesterday.setDate(ereyesterday.getDate() - 1)

        return (
            <Tabs defaultActiveKey="today" id="uncontrolled-tab-example">
                <Tab eventKey="today" title="Today">
                <TableAppToday/>
                </Tab>
                <Tab eventKey="profile" title={yesterday.toLocaleDateString(options)}>
                <TableAppYesterday />
                </Tab>
                <Tab eventKey="ereyesterday" title={ereyesterday.toLocaleDateString(options)}>
                <TableAppEreYesterday />
                </Tab>
            </Tabs>
        );
    }
}

export default TableApp;
