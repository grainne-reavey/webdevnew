import React from "react";
import FusionCharts from "fusioncharts";
import TimeSeries from "fusioncharts/fusioncharts.timeseries";
import ReactFC from 'react-fusioncharts';
import axios from 'axios'
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.candy';

ReactFC.fcRoot(FusionCharts, TimeSeries, FusionTheme);

const options = {
  url: 'https://81.150.99.19:8038/executeQuery',
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
    "query": "raze each select last time,symbol:last sym,last rAvp by sym,1 xbar time.minute from trade",
    "type": "sync",
    "response": true
  }
}

const options1 = {
  url: 'https://81.150.99.19:8038/executeQuery',
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
    "query": " raze each select time,sym,rAvp from Avp",
    "type": "sync",
    "response": true
  }
}

let values = [];
const jsonify = res => res.json();
const dataFetch =
  axios(options)
    .then(response => {
      return (response.data.result.y)
    });

const schema = [{
  "name": "Time",
  "type": "date",
  "format": "%Q"
}, {
  "name": "Type",
  "type": "string"
}, {
  "name": "Price",
  "type": "number",
  format: {
    prefix: "",
    round: "2"
  }
}];

const dataSource = {
  chart: {
    "decimals": "0",
    exportenabled: true,
    theme: "fusion",
  },
  // caption: {
  //   text: "Running Average Price By Sym"
  // },
  subcaption: {
    text: ""
  },
  series: "Type",
  yaxis: [
    {
      plot: [{
        value: "Price",
        connectnulldata: true,
      }
      ],
      title: "USD($)",
      format: {
        prefix: "",
        round: "2"
      }
    }
  ],
  "extensions": {
    "customRangeSelector": {
      "enabled": "0"
    }
  }
}

export default class ChartViewer extends React.Component {
  constructor(props) {
    super(props);
    this.onFetchData = this.onFetchData.bind(this);
    this.state = {
      chart: {},
      currentval: "none",
      timeseriesDs: {
        id: "mychart",
        type: "timeseries",
        renderAt: "container",
        width: "800",
        height: "500",
        dataSource
      }
    };
    this.updateRFOnRenderComplete = this.updateRFOnRenderComplete.bind(this)
  }

  componentDidMount() {
    this.onFetchData();
  }

  updateRFOnRenderComplete(e) {
    console.log(e.sender);
    this.setState({
      chart: e.sender
    });
  }

  async onFetchData() {
    await Promise.all([dataFetch, schema]).then(res => {
      const data = res[0];
      const schema = res[1];
      var fusionTable = new FusionCharts.DataStore().createDataTable(
        data,
        schema
      );

      setInterval(async () => {
        let chartRef = FusionCharts("mychart")
        await axios(options1)
          .then(response => {
            chartRef.feedData(response.data.result);
          });
      }, 5000);

      const timeseriesDs = Object.assign({}, this.state.timeseriesDs);
      timeseriesDs.dataSource.data = fusionTable;
      this.setState({
        timeseriesDs
      });

    });
  }

  getChartRef(chart) {
    this.chartRef = chart;
  }

  render() {
    return (
      <div class="box effect7" align="center">
        <hr/>
        <h4>Running Average Price</h4>
        <hr />
        {this.state.timeseriesDs.dataSource.data ? (
          <ReactFC
            {...this.state.timeseriesDs}
            fcEvent-renderComplete={this.updateRFOnRenderComplete}
          />
        ) : (
            <div>
              <div><h5>Loading...</h5></div>
              <hr />
            </div>

          )}
      </div>

    );
  }
}