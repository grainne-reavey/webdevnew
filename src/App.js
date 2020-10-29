
import React from 'react';
import AveragePrice from './Graphs/AveragePrice';
import Volatility from './Graphs/Volatility';
import Datatable from './DataTable/TableApp';
import './App.css';


class App extends React.Component {
  render() {
    return (
      <div class="w-100 p-10">
        <div class="row">
          <div class="w-10 p-5"></div>
          <div class="col">
            <AveragePrice />
          </div>
          <div class="w-30 p-5"></div>
          <div class="col">
            <Volatility />
          </div>
          <div class="col-1"></div>
        </div>
        <div class="space-box"></div>
        <div class="row">
          <div class="col-1"></div>
          <div class="col">
            <Datatable />
          </div>
          <div class="col-1"></div>
        </div>
      </div>



    );
  }
}
export default App;