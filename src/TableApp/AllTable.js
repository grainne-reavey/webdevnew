import './index.css';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import React, { useMemo, useState, useEffect } from 'react'
import axios from 'axios'
import TodayEnhancedTable from './TodayTable'
import YestEnhancedTable from './YestTable'
import EreYestEnhancedTable from './EreYestTable';

var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
var today = new Date();
var yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1)
var ereyesterday = new Date(yesterday);
ereyesterday.setDate(ereyesterday.getDate() - 1)

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
      .catch(error => alert('Disconnected from API. Will not Load All Data'))
  });
};

function TodayApp() {

  const [TodaytableData, setTableData] = useState([]);

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
        // "query": "select price:last price, diff:last(deltas(price)), maxp:max price, minp:min price by sym from trade where time.date =.z.d",
        "query": "t:select price:last price, diff:last (deltas(price)), maxp: last max price, maxt: last string time where price=max price, minp: last min price, mint: last string time where price = min price by sym from trade where time.date=.z.d;q:select volume:sum bsize+ asize by sym from quote where time.date=.z.d; aj[`sym;t;q]",
        // "query": "select price:last price, diff:last (deltas(price)), maxp: last max price, maxt: last string time where price=max price, minp: last min price, mint: last string time where price = min price by sym from trade where time.date=.z.d",
        "type": "sync",
        "response": true
      }
    });
    setTableData(data.result);
    console.log(data);
  }



  useEffect(() => {
    processRequest(setTableData);
  });

  console.log(TodaytableData)

  return (
    <TodayEnhancedTable data={TodaytableData} />
  );
}


function YestApp() {
  // const [YesttableData, setTableData] = useState([]);

  // const processRequest = async setTableData => {
  //   const { data } = await makeRequest({
  //     url: 'https://81.150.99.19:8037/executeQuery',
  //     method: 'POST',
  //     headers: {
  //       "Accept": "*/*",
  //       "Authorization": "BASIC dXNlcjpwYXNz"
  //     },
  //     auth: {
  //       username: 'user',
  //       password: 'pass'
  //     },
  //     data: {
  //       "query": "select yoprice:first price, ycprice:last price, ymaxp:max price, yminp:min price by sym from trade where time.date =(.z.d - 1)",
  //       "type": "sync",
  //       "response": true
  //     }
  //   });
  //   setTableData(data.result);
  //   console.log(data);
  // } 

  // useEffect(() => {
  //     const timer = setInterval(() => {
  //         processRequest(setTableData).catch(error => alert('Disconnected from API'));
  //       },5000);

  //       return () => clearInterval(timer);
  //     }
  // );

  // useEffect(() => {
  //     processRequest(setTableData)
  // });

  // console.log(YesttableData)

  const options = {
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
      "query": "select yoprice:first price, ycprice:last price, ymaxp:max price, yminp:min price by sym from trade where time.date =(.z.d - 1)",
      "type": "sync",
      "response": true
    }
  }

  const [dataYesterday, setData] = useState([])

  useEffect(() => {
    axios(options).then(res => {

      setData(res.data.result.map(p => p))
    }).catch(error => alert('Disconnected from API. Will not Load All Data'))
  }, []);

  return (
    <YestEnhancedTable data={dataYesterday} />
  );
}

function EreYestApp() {

  //const [EreYesttableData, setTableData] = useState([]);

  // const processRequest = async setTableData => {
  //   const { data } = await makeRequest({
  //     url: 'https://81.150.99.19:8037/executeQuery',
  //     method: 'POST',
  //     headers: {
  //       "Accept": "*/*",
  //       "Authorization": "BASIC dXNlcjpwYXNz"
  //     },
  //     auth: {
  //       username: 'user',
  //       password: 'pass'
  //     },
  //     data: {
  //       "query": "select eyoprice:first price, eycprice:last price, eymaxp:max price, eyminp:min price by sym from trade where time.date =(.z.d - 2)",
  //       "type": "sync",
  //       "response": true
  //     }
  //   });
  //   setTableData(data.result);
  //   console.log(data);
  // } 

  // useEffect(() => {
  //     const timer = setInterval(() => {
  //         processRequest(setTableData).catch(error => alert('Disconnected from API'));
  //       },5000);

  //       return () => clearInterval(timer);
  //     }
  // );

  // useEffect(() => {
  //     processRequest(setTableData)
  // });

  // console.log(EreYesttableData)

  const options = {
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
      "query": "select eyoprice:first price, eycprice:last price, eymaxp:max price, eyminp:min price by sym from trade where time.date =(.z.d - 2)",
      "type": "sync",
      "response": true
    }
  }

  const [dataEreYesterday, setData] = useState([])

  useEffect(() => {
    axios(options).then(res => {

      setData(res.data.result.map(p => p))
    }).catch(error => alert('Disconnected from API. Will not Load All Data'))
  }, []);

  return (
    <EreYestEnhancedTable data={dataEreYesterday} />
  );
}

export default function AllTable() {

  return (
    <div class ="row">
      <div class="col-1"></div>
    <div class="col effect7" align="center">
      <Paper>
        <div>
          <ul class="nav nav-tabs">
            <li class="nav-item"><a class="nav-link active" data-toggle="tab" href="#1home">Today</a></li>
            <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#1menu1">{yesterday.toLocaleDateString(options)} </a></li>
            <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#1menu2">{ereyesterday.toLocaleDateString(options)} </a></li>
          </ul>
          <div class="tab-content" width="100%" align="center">
            <div class="tab-pane container active table1" id="1home" align="center">
      
              <div class="row" className="rowTitleTable1">
                <div clas="col-8"></div>
              <div class="col" align="center">
              <h1></h1>
              <h4>Table Data - Today </h4>
              </div>
              <div clas="col"></div>
              </div>
              <TodayApp />
            </div>
            <div class="tab-pane container fade table2" id="1menu1">
            <div class="row" className="rowTitleTable">
              <h4>Table Data - {yesterday.toLocaleDateString(options)} </h4>
              </div>
              <YestApp />
            </div>
            <div class="tab-pane container fade" id="1menu2">
            <div class="row" className="rowTitleTable">
              <h4>Table Data - {ereyesterday.toLocaleDateString(options)}</h4>
              </div>
              <EreYestApp />
            </div>
          </div>
        </div>
      </Paper>
    </div>
    <div class="col-1"></div>
    </div>
  );
}