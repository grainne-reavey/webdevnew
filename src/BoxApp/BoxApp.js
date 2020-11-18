// export default BoxApp;
import React, { useState, useEffect } from 'react'
import axios from 'axios'
//import TableData from './Table'
import { Button, ButtonGroup, Table } from 'react-bootstrap'
import './index.css'
import RGL, { WidthProvider } from "react-grid-layout";
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import Tooltip from '@material-ui/core/ToolTip';

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
    try {
      axios.request(config)
        .then(response => {
          resolve(response)
        })
    } catch (error) {
      alert('Disconnected from API. Will not Load All Data')
    }
    //.catch(error => alert(error.message));
  })
};
var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
var today = new Date();
var yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1)
var ereyesterday = new Date(yesterday);
ereyesterday.setDate(ereyesterday.getDate() - 1)
function nFormatter(num, digits) {
  var si = [
    { value: 1, symbol: "" },
    { value: 1E3, symbol: " k" },
    { value: 1E6, symbol: "" },
    { value: 1E9, symbol: " G" },
    { value: 1E12, symbol: " Tril" },
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
function BoxAppToday() {

  const [tableDatatoday, setTableData, currentDate] = useState([]);

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
        "query": "a:xdesc[`totalvol] select totalvol:sum asize+bsize by sym from quote where time.date=.z.d;b:select last string time by sym from quote where time.date=.z.d;select[1] from aj[`sym;a;b]",
        "type": "sync",
        "response": true
      }
    });
    try {
      setTableData(data.result);
      console.log(data);
    } catch (error) {
      alert("TorQ Down")
    }
  }
  useEffect(() => {
    try {
      processRequest(setTableData);
    } catch (error) {
      alert("TorQ Down")
    }
  });
  console.log(tableDatatoday)
  return (

    <Table class="tabelformat">
      <tbody>
        {(tableDatatoday.length > 0) ? tableDatatoday.map((tableDatatoday, sym) => {
          return (

            <tr key={sym}>
              <td class="row_today1" align="center">

                <Tooltip title={<h6>Last Updated: {tableDatatoday.time.slice(11, 19)} </h6>} arrow>
                  <h7>Today</h7>
                </Tooltip>
              </td>
              <td class="row_today2" align="center">{tableDatatoday.sym}</td>
              <td class="row_today3" align="center">{tableDatatoday.totalvol}</td>
              <td class="row_today4" align="center">{nFormatter(tableDatatoday.totalvol, 2)}</td>
            </tr>
          )
        }) : <tr><td colSpan="5" align="center">Loading...</td></tr>}
      </tbody>
    </Table>

  );
}
function BoxAppYesterday() {

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
      "query": "a:xdesc[`totalvol] select totalvol:sum asize+bsize by sym from quote where time.date=(.z.d-1); select[1] from a",
      "type": "sync",
      "response": true
    }
  }
  const [tableDatayesterday, setData] = useState([])
  useEffect(() => {
    axios(options).then(res => {
      setData(res.data.result.map(p => p))
    }).catch(error => alert('Disconnected from API. Will not Load All Data'))
  }, []);
  return (

    <Table class="tableformat">
      <tbody>
        {(tableDatayesterday.length > 0) ? tableDatayesterday.map((tableDatayesterday, sym) => {
          return (
            <tr key={sym}>
              <td class="row_today1" align="center">{yesterday.toLocaleDateString(options)}</td>
              <td class="row_today2" align="center" >{tableDatayesterday.sym}</td>
              <td class="row_today3" align="center">{tableDatayesterday.totalvol}</td>
              <td class="row_today4" align="center">{nFormatter(tableDatayesterday.totalvol, 2)}</td>
            </tr>

          )
        }) : <tr><td colSpan="5" align="center">Loading...</td></tr>}
      </tbody>
    </Table>

  );
}
function BoxAppEreyesterday() {

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
      "query": "a:xdesc[`totalvol] select totalvol:sum asize+bsize by sym from quote where time.date=(.z.d-2); select[1] from a",
      "type": "sync",
      "response": true
    }
  }
  const [tableDataereyesterday, setData] = useState([])
  useEffect(() => {
    axios(options).then(res => {
      setData(res.data.result.map(p => p))
    }).catch(error => alert('Disconnected from API. Will not Load All Data'))
  }, []);
  return (

    <Table class="tableformat">
      <tbody>
        {(tableDataereyesterday.length > 0) ? tableDataereyesterday.map((tableDataereyesterday, sym) => {
          return (
            <tr key={sym}>
              <td class="row_today1" align="center">{ereyesterday.toLocaleDateString(options)}</td>
              <td class="row_today2" align="center" >{tableDataereyesterday.sym}</td>
              <td class="row_today3" align="center">{tableDataereyesterday.totalvol}</td>
              <td class="row_today4" align="center" >{nFormatter(tableDataereyesterday.totalvol, 2)}</td>
            </tr>
          )
        }) : <tr><td colSpan="5" align="center">Loading...</td></tr>}
      </tbody>
    </Table>
  );
}
function NoTables() {
  { return (<div></div>); };
}

class BoxApp extends React.Component {
  constructor() {
    super();
    this.state = {
      showToday: false,
      isToggleOnToday: false

    };

    this.hideComponent = this.hideComponent.bind(this);
    this.handleClickToday = this.handleClickToday.bind(this);

  }

  handleClickToday() {
    this.setState(prevState => ({
      isToggleOnToday: !prevState.isToggleOnToday
    }));
  }

  hideComponent(name) {
    switch (name) {
      case "showToday":
        this.setState({ showToday: !this.state.showToday });
        break;
      // case "showYesterday":
      //   this.setState({ showYesterday: !this.state.showYesterday });
      //   break;
      // case "showEreYesterday":
      //   this.setState({ showEreYesterday: !this.state.showEreYesterday });
      //   break;
      default:
        return <NoTables />
    }
  }
  onClickFunction(e) {
    switch (e) {
      case "1":
        this.handleClickToday();
        this.hideComponent("showToday");
        break;
      // case "2":
      //   this.handleClickYesterday();
      //   this.hideComponent("showYesterday");
      //   break;
      // case "3":
      //   this.handleClickEreYesterday();
      //   this.hideComponent("showEreYesterday");
      //   break;
      default:
        return <NoTables />
    }
  }
  render() {
    const { showToday, showing } = this.state;


    return (
      <div>
        <div class="row" align="center">
          <div class="col-5"></div>
          <Button class="btn btn-space" variant="secondary" id="1" onClick={() => { this.onClickFunction("1") }}>{this.state.isToggleOnToday ? 'Hide ' : 'Show '}Highest Traded Syms</Button>
        </div>
        {showToday && <div class="box effect7" align="center">

          <Table >
            <tr>
              <td class="row_today1" align="center"><h6>Day</h6></td>
              <td class="row_today2" align="center" ><h6>Highest Traded Sym</h6></td>
              <td class="row_today3" align="center"><h6>Total Volume</h6></td>
              <td class="row_today4" align="center" ><h6>Rounded Volume (Mill)</h6></td>
            </tr>
          </Table>
          <Table>
            <BoxAppToday />
            <BoxAppYesterday />
            <BoxAppEreyesterday />
          </Table>
          <hr class="hrBoxTable"></hr>
        </div>}
      </div>

    )
  }
}
export default BoxApp;
