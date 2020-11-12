import React from 'react';
import ChartViewer from './Graphs/ChartViewer';
import Volatility from './Graphs/Volatility';
import TableApp from './DataTableGrainne/TableApp';
import AllTable from './TableApp/AllTable';
import BoxApp from './BoxApp/BoxApp';
import './App.css';
import RGL, { WidthProvider } from "react-grid-layout";
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import './index.css'

const ReactGridLayout = WidthProvider(RGL);

class App extends React.Component {
  constructor() {
    super();
    this.state = {
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
  };

  render() {
    return (

      <div>
        <div class="space-box"></div>
        <div class="row">
          <div class="col-1"></div>
          <div class="col-5" align="center">
            <ChartViewer/>
          </div>
          <div class="col-5" align="center">
            <Volatility />
          </div>
          <div class="col-1"></div>
        </div>
        <div class="space-box"></div>
        <div class="row">
          <div class="col-3"></div>
          <div class="col">
            <div class="col"></div>
            <div align="center">
              <AllTable />
            </div>
            <div class="col"></div>
          </div>
          <div class="col-3"></div>
        </div>
        <div class="space-box"></div>
        <div class="row">
          <div class="col-1"></div>
          <div class="col" align="right">
            <hr />
            <hr />
            <BoxApp />
          </div>
          <div class="col-1"></div>
        </div>
        <div class="space-box"></div>
      </div>

    );
  }
}
export default App;