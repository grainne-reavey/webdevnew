import React from "react";
import FusionCharts from "fusioncharts";
import TimeSeries from "fusioncharts/fusioncharts.timeseries";
import ReactFC from 'react-fusioncharts';
import axios from 'axios'
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.candy';
import './index.css'

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
        "query": " raze each select Array,volatility from select Array:(last time,'last sym), volatility:last 2 mdev price by sym, 1 xbar time.minute from trade where time.date=.z.d",
        "type": "sync",
        "response": true
    }
}
const options1 = {
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
        //update newprice:sqrt((sum (abs price-sum avg price) xexp 2)%count price) by sym from `trade
        //"query": " raze each select Array,Avp from select Array:(last time,'last sym), Avp:(last(sums price))%last sums count each sym by sym, 1 xbar time.minute from trade where time.date=.z.d",
        //raze each select Array,Avp from select Array:(last time,'last sym), Avp:(last(sums price))%last sums count each sym by sym
        //"raze each select array:(first time, 'first sym), volatility:first(dev (1_(price))) by sym, 5 xbar time.minute from trade where time.date = (.z.d)"
        "query": " raze each select Array,volatility from select Array:(last time,'last sym),  volatility:last 2 mdev price by sym from trade where time.date=.z.d",
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
const dataFetchhdb =
    axios(options)
        .then(response => {
            return (response.data.result)
        });
console.log(dataFetch)
console.log(dataFetchhdb)
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
        theme: "fusion"
    },
    // caption: {
    //     text: "Volatility"
    // },
    subcaption: {
        text: ""
    },
    series: "Type",
    yaxis: [
        {
            plot: "Volatility",
            title: "Volatility",
            format: {
                prefix: "",
                round: "2"
            }
        }
    ]
}
export default class Volatility extends React.Component {
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
                width: "600",
                height: "600",
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
    onFetchData() {
        Promise.all([dataFetch, schema]).then(res => {
            const data = res[0];
            const schema = res[1];
            var fusionTable = new FusionCharts.DataStore().createDataTable(
                data,
                schema
            );
            setInterval(() => {
                let chartRef = FusionCharts("mychart2")
                axios(options1)
                    .then(response => {
                        chartRef.feedData(response.data.result);
                    });
            }, 60000);
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