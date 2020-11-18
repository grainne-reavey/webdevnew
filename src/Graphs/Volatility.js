// import React from "react";
// import FusionCharts from "fusioncharts";
// import TimeSeries from "fusioncharts/fusioncharts.timeseries";
// import ReactFC from 'react-fusioncharts';
// import axios from 'axios'
// import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.candy';
// ReactFC.fcRoot(FusionCharts, TimeSeries, FusionTheme);
// const options = {
//   url: 'https://81.150.99.19:8037/executeQuery',
//   method: 'POST',
//   headers: {
//     "Accept": "*/*",
//     "Authorization": "BASIC dXNlcjpwYXNz"
//  },
// auth: {
//     username: 'user',
//     password: 'pass'
//  },
// data: {
//   //Specify your query here
//   "query": " t1:raze each select Array,volatility from select Array:(last time,'last sym), volatility:last 2 mdev price by sym, 50 xbar time.minute from trade where time.date=.z.d-3;t2:raze each select Array,volatility from select Array:(last time,'last sym), volatility:last 2 mdev price by sym, 50 xbar time.minute from trade where time.date=.z.d-2;t1:raze each select Array,volatility from select Array:(last time,'last sym), volatility:last 2 mdev price by sym, 50 xbar time.minute from trade where time.date=.z.d-3;t3:raze each select Array,volatility from select Array:(last time,'last sym), volatility:last 2 mdev price by sym, 50 xbar time.minute from trade where time.date=.z.d-1;t1,t2,t3",
//   "type": "sync",
//   "response": true
//   }
// } 
// let values =[];
// const jsonify = res => res.json();
// const dataFetch = 
//    axios(options)
//   .then(response => {
//   return(response.data.result)}); 
// console.log(dataFetch)
// const schema = [{
//   "name": "Time",
//   "type": "date",
//   "format": "%Q"
// }, {
//   "name": "Type",
//   "type": "string"
// }, {
//   "name": "Volatility",
//   "type": "number",
//   format:{
//       round: "2"
//   }
// }];
// const dataSource = {
//   chart: {
//     "decimals": "0",
//     exportenabled: true,
//     theme: "fusion"
//   },
// //   caption: {
// //     text: "Volatility"
// //   },
//   subcaption: {
//     text: ""
//   },
//   series: "Type",
//   yaxis: [
//     {
//       plot:[
//         {
//           value:"Volatility",
//           connectnulldata: "1",
//         }
//       ],
//       title: "Volatility",
//       format: {
//         prefix: "",
//         round: "2"
//       }
//     }
//   ]
// }
// export default class ChartViewer extends React.Component {
//   constructor(props) {
//     super(props);
//     this.onFetchData = this.onFetchData.bind(this);
//     this.state = {
//       chart: {},
//       currentval: "none",
//       timeseriesDs: {
//         id: "mychart2",
//         type: "timeseries",
//         renderAt: "container",
//         width: "800",
//         height: "500",
//         dataSource
//       }
//     };
//   }
//   componentDidMount() {
//     this.onFetchData();
//   }
//   onFetchData() {
//     Promise.all([dataFetch, schema]).then(res => {
//       const data = res[0];
//       const schema = res[1];
//       var fusionTable = new FusionCharts.DataStore().createDataTable(
//         data,
//         schema
//       );
//       const timeseriesDs = Object.assign({}, this.state.timeseriesDs);
//       timeseriesDs.dataSource.data = fusionTable;
//       this.setState({
//         timeseriesDs
//       });
//     });
//   }
//   getChartRef(chart) {
//     this.chartRef = chart;
//   }
import React from "react";
import FusionCharts from "fusioncharts";
import TimeSeries from "fusioncharts/fusioncharts.timeseries";
import ReactFC from 'react-fusioncharts';
import axios from 'axios'
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.candy';
ReactFC.fcRoot(FusionCharts, TimeSeries, FusionTheme);

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
    //Specify your query here
    "query": " t1:raze each select Array,volatility from select Array:(last time,'last sym), volatility:last dev price by sym, 10 xbar time.minute from trade where time.date=.z.d-3;t2:raze each select Array,volatility from select Array:(last time,'last sym), volatility:dev price by sym, 10 xbar time.minute from trade where time.date=.z.d-2;t1:raze each select Array,volatility from select Array:(last time,'last sym), volatility:last dev price by sym, 10 xbar time.minute from trade where time.date=.z.d-3;t3:raze each select Array,volatility from select Array:(last time,'last sym), volatility:last dev price by sym, 10 xbar time.minute from trade where time.date=.z.d-1;t1,t2,t3",
    "type": "sync",
    "response": true
  }
}
let values = [];
const jsonify = res => res.json();
const dataFetch =
  axios(options)
    .then(response => {
      return (response.data.result)
    });
console.log(dataFetch)
const schema = [{
  "name": "Time",
  "type": "date",
  "format": "%Q"
}, {
  "name": "Type",
  "type": "string"
}, {
  "name": "Volatility",
  "type": "number",
  format: {
    round: "2"
  }
}];
const dataSource = {
  chart: {
    "decimals": "0",
    exportenabled: true,
    theme: "fusion",
  },
  //   caption: {
  //     text: "Volatility"
  //   },
  subcaption: {
    text: ""
  },
  series: "Type",
  yaxis: [
    {
      plot: [
        {
          value: "Volatility",
          connectnulldata: "1",

        }
      ],
      title: "Volatility",
      style: {
        title: {
          "font-size": "20",
        },
        "label-major": {
          "font-size": "15",
        },
      },
      format: {
        prefix: "",
        round: "2"
      }
    }
  ],
  xAxis: [
    {
      plot: "Time",
      title: "Time",
      "labelFontColor": "0075c2",
      style: {
        title: {
          "font-size": "20"
        },
        "label": {
          "font-size": "15"
        },
        "label-major":{
          "font-size": "16"
        }
      },
    }
  ]
  // "extensions": {
  //   "standardRangeSelector": {
  //     "style": {
  //       "button-text": {
  //         "font-size": "15"
  //       }
  //     }
  //   },
    // "extensions": {
    //   "customRangeSelector": {
    //     "style": {
    //       "title-text": {
    //         "font-size": "15"
    //       }
    //     }
    //   }
    // },
    // "navigator": {
    //   enabled: Boolean,
    //   "window": {
    //     "style": {
    //       "label": {
    //         "font-size": "20"
    //       }
    //     }
    //   }
    // },
    // "dataMarker": [{
    //   "style": {
    //     "marker": "txt-big"
    //   }
    // }]

  //}
}


export default class ChartViewer extends React.Component {
  constructor(props) {
    super(props);
    this.onFetchData = this.onFetchData.bind(this);
    this.state = {
      chart: {},
      currentval: "none",
      timeseriesDs: {
        id: "mychart2",
        type: "timeseries",
        renderAt: "container",
        width: "750",
        height: "600",
        dataSource
      }
    };
  }
  componentDidMount() {
    this.onFetchData();
  }
  onFetchData() {
    Promise.all([dataFetch, schema]).then(res => {
      const data = res[0];
      const schema = res[1];
      var fusionTable = new FusionCharts.DataStore().createDataTable(
        data,
        schema
      );
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
      <div class="box effect7" align="center" width="100%">
        <hr />
        <h4>Volatility</h4>
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