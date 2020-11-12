import React, { useState, useEffect } from 'react'
import axios from 'axios'
import EnhancedTableToday from './TableListToday';
import { Button, ButtonGroup } from 'react-bootstrap'
import './index.css';
import EnhancedTableYesterday from './TableListYesterday';
import EnhancedTableEreYesterday from './TableListEreYesterday';
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
      }
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
        "query": "select openPrice:first price, closePrice:last price,maxPrice:max price, minPrice:min price by sym from trade where time.date =(.z.d-1)",
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

function NoGraphs() {
  { return (<div></div>); };
}

const ReactGridLayout = WidthProvider(RGL);

class TableApp extends React.PureComponent {
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
        return <NoGraphs />
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
        return <NoGraphs />
    }
  }

  onLayoutChange = (layout) => {
    this.setState({ layout });
  }

  onResize = (layouts) => {
    this.setState({
      layout: layouts,
    });
  };

  render() {
    const { showToday, showYesterday, showEreYesterday } = this.state;
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var today = new Date();
    var yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1)
    var ereyesterday = new Date(yesterday);
    ereyesterday.setDate(ereyesterday.getDate() - 1)

    return (
      <div>
        <div class="row">
          <div class ="col"></div>
          <div class = "col">
            <ButtonGroup size ="lg">
          <Button variant="secondary" id="1" onClick={() => { this.onClickFunction("1") }}>{this.state.isToggleOnToday ? 'Hide ' : 'Show '}Today</Button>
          <Button variant="secondary" id="2" onClick={() => { this.onClickFunction("2") }}>{this.state.isToggleOnYesterday ? 'Hide ' : 'Show '}{yesterday.toLocaleDateString(options)}</Button>
          <Button variant="secondary" id="3" onClick={() => { this.onClickFunction("3") }}>{this.state.isToggleOnEreYesterday ? 'Hide ' : 'Show '}{ereyesterday.toLocaleDateString(options)}</Button>
          </ButtonGroup>
          </div>
          <div class ="col"></div>
        </div>
        <hr />
        {this.state.isToggleOnToday || this.state.isToggleOnYesterday || this.state.isToggleOnEreYesterday ? (
            <ReactGridLayout
              rowHeight={335}
              cols={3}
              onResize={this.onResize}
              width={80}
              layout={this.state.layout}
              onLayoutChange={this.onLayoutChange}
            >
              <div key={1}>
                {showToday && <TableAppToday />}
              </div>
              <div key={2}>
                {showYesterday && <TableAppYesterday />}
              </div>
              <div key={3}>
                {showEreYesterday && <TableAppEreYesterday />}
              </div>
            </ReactGridLayout> 
        ) : null}    
      </div>
    );
  }
}
TableApp.defaultProps = {
  rowHeight: 150,
  cols: 3,
};

export default TableApp;



