import React, { useState, useEffect } from 'react'
import axios from 'axios'
//import TableData from './Table'
import { Button, ButtonGroup, Table } from 'react-bootstrap'
import './index.css'
import RGL, { WidthProvider } from "react-grid-layout";
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
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
        "query": "a:select by max totalvol from select totalvol:sum asize+bsize by sym from quote where time.date=.z.d;b:select last string time by sym from quote where time.date=.z.d;aj[`sym;a;b]",
        "type": "sync",
        "response": true
      }
    });
    try {
      setTableData(data.result);
      console.log(data);
    } catch (error) {
      alert(error.message)
    }

  }
  useEffect(() => {
    try {
      processRequest(setTableData);
    } catch (error) {
      alert(error.message)
    }
  });

  console.log(tableDatatoday)
  return (

    <div>
      <div>
        <Table cellPadding={0} cellSpacing={0} striped bordered hover>
          <thead>
          <tr align="center"><th><h5>Today</h5></th></tr>
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
            {(tableDatatoday.length > 0) ? tableDatatoday.map((tableDatatoday, sym) => {
              return (
                <div>
                  <tr class="d-flex" key={sym}>
                    <td class="col-4" >{tableDatatoday.sym}</td>
                    <td class="col-4">{tableDatatoday.totalvol}</td>
                    <td class="col-4">{nFormatter(tableDatatoday.totalvol, 2)}</td>
                  </tr>
                  <div align="center">Last Updated: {tableDatatoday.time.slice(11, 19)}</div>
                </div>
              )
            }) : <tr><td colSpan="5" align="center">Loading...</td></tr>}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
function BoxAppYesterday() {
  // const [tableDatayesterday, setTableData] = useState([]);
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
  //       //Specify your query here
  //       "query": "select by max totalvol  from select totalvol:sum asize+bsize by sym from quote where time.date=.z.d-1",
  //       "type": "sync",
  //       "response": true
  //     }
  //   });
  //   setTableData(data.result);
  //   console.log(data);
  // }
  // useEffect(() => {
  //   processRequest(setTableData)
  // });
  // console.log(tableDatayesterday)
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
      "query": "select by max totalvol  from select totalvol:sum asize+bsize by sym from quote where time.date=.z.d-1",
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
    // <div align="center">
    //   <div>
    //     <TableData data={tableDatayesterday} />
    //   </div>
    // </div>
    <div>
      <div>
        <Table cellPadding={0} cellSpacing={0} striped bordered hover>
          <thead>
          <tr align="center"><th><h5>{yesterday.toLocaleDateString(options)}</h5></th></tr>
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
            {(tableDatayesterday.length > 0) ? tableDatayesterday.map((tableDatayesterday, sym) => {
              return (
                <div>
                  <tr class="d-flex" key={sym}>
                    <td class="col-4" >{tableDatayesterday.sym}</td>
                    <td class="col-4">{tableDatayesterday.totalvol}</td>
                    <td class="col-4">{nFormatter(tableDatayesterday.totalvol, 2)}</td>
                  </tr>
                </div>
              )
            }) : <tr><td colSpan="5" align="center">Loading...</td></tr>}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
function BoxAppEreyesterday() {
  // const [tableDataereyesterday, setTableData] = useState([]);
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
  //       //Specify your query here
  //       "query": "select by max totalvol  from select totalvol:sum asize+bsize by sym from quote where time.date=.z.d-2",
  //       "type": "sync",
  //       "response": true
  //     }
  //   });
  //   setTableData(data.result);
  //   console.log(data);
  // }
  // useEffect(() => {
  //   processRequest(setTableData)
  // });
  // console.log(tableDataereyesterday)
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
      "query": "select by max totalvol  from select totalvol:sum asize+bsize by sym from quote where time.date=.z.d-2",
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
    // <div>
    //   <div>
    //     <TableData data={tableDataereyesterday} />
    //   </div>
    // </div>
    <div>
    <div>
      <Table cellPadding={0} cellSpacing={0} striped bordered hover>
        <thead>
        <tr align="center"><th><h5>{ereyesterday.toLocaleDateString(options)}</h5></th></tr>
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
          {(tableDataereyesterday.length > 0) ? tableDataereyesterday.map((tableDataereyesterday, sym) => {
            return (
              <div>
                <tr class="d-flex" key={sym}>
                  <td class="col-4" >{tableDataereyesterday.sym}</td>
                  <td class="col-4">{tableDataereyesterday.totalvol}</td>
                  <td class="col-4">{nFormatter(tableDataereyesterday.totalvol, 2)}</td>
                </tr>
              </div>
            )
          }) : <tr><td colSpan="5" align="center">Loading...</td></tr>}
        </tbody>
      </Table>
    </div>
  </div>
  );
}

function NoTables() {
  { return (<div></div>); };
}
const ReactGridLayout = WidthProvider(RGL);

class BoxApp extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "React",
      showToday: false,
      showYesterday: false,
      showEreYesterday: false,
      isToggleOnToday: false,
      isToggleOnYesterday: false,
      isToggleOnEreYesterday: false,
      layout: [
        { i: '1', x: 0, y: 0, w: 1, h: 2, minH: 2, maxH: 2 },         // *** -- minH & maxH doesnt effect the grid items
        { i: '2', x: 1, y: 0, w: 1, h: 2, minH: 2, maxH: 2 },
        { i: '3', x: 0, y: 1, w: 1, h: 2, minH: 2, maxH: 2 },
        { i: '4', x: 1, y: 1, w: 1, h: 2, minH: 2, maxH: 2 }
      ],
      resizeplotly: false,
    };
  }

  onLayoutChange = (layout) => {
    this.setState({ layout });
  }

  onResize = (layouts) => {
    this.setState({
      layout: layouts,
    });



    this.hideComponent = this.hideComponent.bind(this);
    this.handleClickToday = this.handleClickToday.bind(this);
    this.handleClickYesterday = this.handleClickYesterday.bind(this);
    this.handleClickEreYesterday = this.handleClickEreYesterday.bind(this);
  }

  handleClickToday() {
    this.setState(prevState => ({
      isToggleOnToday: !prevState.isToggleOnToday
    }));
  }

  handleClickYesterday() {
    this.setState(prevState => ({
      isToggleOnYesterday: !prevState.isToggleOnYesterday
    }));
  }

  handleClickEreYesterday() {
    this.setState(prevState => ({
      isToggleOnEreYesterday: !prevState.isToggleOnEreYesterday
    }));
  }

  hideComponent(name) {
    switch (name) {
      case "showToday":
        this.setState({ showToday: !this.state.showToday });
        break;
      case "showYesterday":
        this.setState({ showYesterday: !this.state.showYesterday });
        break;
      case "showEreYesterday":
        this.setState({ showEreYesterday: !this.state.showEreYesterday });
        break;
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
      case "2":
        this.handleClickYesterday();
        this.hideComponent("showYesterday");
        break;
      case "3":
        this.handleClickEreYesterday();
        this.hideComponent("showEreYesterday");
        break;
      default:
        return <NoTables />
    }
  }

  render() {
    const { showToday, showYesterday, showEreYesterday, showing } = this.state;
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var today = new Date();
    var yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1)
    var ereyesterday = new Date(yesterday);
    ereyesterday.setDate(ereyesterday.getDate() - 1)
    return (
      <div>
        <div class="row">
          <div class="col"></div>
          <div class="col">
            <ButtonGroup size="md">
              <Button class="btn btn-space" variant="secondary" id="1" onClick={() => { this.onClickFunction("1") }}>{this.state.isToggleOnToday ? 'Hide Highest Traded Sym: ' : 'Show Highest Traded Sym: '}Today</Button>
              <Button class="btn btn-space" variant="secondary" id="2" onClick={() => { this.onClickFunction("2") }}>{this.state.isToggleOnYesterday ? 'Hide Highest Traded Sym: ' : 'Show Highest Traded Sym: '}{yesterday.toLocaleDateString(options)}</Button>{' '}
              <Button class="btn btn-space" variant="secondary" id="3" onClick={() => { this.onClickFunction("3") }}>{this.state.isToggleOnEreYesterday ? 'Hide Highest Traded Sym:' : 'Show Highest Traded Sym: '}{ereyesterday.toLocaleDateString(options)}</Button>
            </ButtonGroup>
          </div>
          <div class="col"></div>
        </div>
        <div class="row" >
          <div class="col-1"></div>
          <div class="col">
            {this.state.isToggleOnToday || this.state.isToggleOnYesterday || this.state.isToggleOnEreYesterday ? (
              <ReactGridLayout
                rowHeight={95}
                cols={3}
                onResize={this.onResize}
                width={50}
                layout={this.state.layout}
                onLayoutChange={this.onLayoutChange}
              >
                <div key={1}>
                  {showToday && <BoxAppToday />}
                </div>
                <div key={2} >
                  {showYesterday && <BoxAppYesterday />}
                </div>
                <div key={3} >
                  {showEreYesterday && <BoxAppEreyesterday />}
                </div>

              </ReactGridLayout>
            ) : null}
          </div>
          <div class="col-1"></div>
        </div>
      </div>
    )
  }
}

export default BoxApp;

