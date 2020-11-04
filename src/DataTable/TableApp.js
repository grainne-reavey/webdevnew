// List of imports
import React , { useMemo, useState, useEffect } from 'react'
import axios from 'axios'
import Datatable from './datatable'
import Tableslist from './Tableslist'
import AveragePrice from './Graphs/AveragePrice';
import Volatility from './Graphs/Volatility';
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


//defines our App function, everything inside this can be rendered
export default function App() {
  //Defines two states: Our data state and our q state, useState requires two arguments;the name of the state and the change state function, 
  //I've called these "data" and "setData". It also requires a default value so I've just given it an empty array
  const [tableData, setTableData] = useState([]);
  //The q state allows us to filter with the search bar, I've given it a default value of an empty string
  const [q, setQ] = useState("");
 //Use effect allows us to map the results from our qRest query into our data state. The options constant parameter is defined at the top containing
 //all our qRest information. The p => p means that each member of our array is mapped to the state.
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
      "query": "select price:last price, diff:last(deltas(price)) by sym from trade where time.date =.z.d",
      "type": "sync",
      "response": true
    }
  });
  setTableData(data.result);
  console.log(data);
} 


  useEffect(() => {
    const timer = setInterval(() => {
      processRequest(setTableData)
    .catch(error => alert('Disconnected from API'))
    ;
  },1000);


  return () => clearInterval(timer);
  });
 
//This function is related to the search bar. The .LowerCase functions allow for queries in the search bar to be case insensitive. The row.sym ensures
//That only the sym is being filtered
 function search(rows) {
   return rows.filter(row => row.sym.toLowerCase().indexOf(q.toLowerCase()) > -1) 
 }

 console.log(tableData)

 /*
//This defines what we return on the screen. The input line creates a search bar and the <Datatable data={data} />  line displays the Datatable component
  return (
    <div class="w-100 p-10">
      <div class="row">
        <input type="text" value={q} onChange={(e) => setQ(e.target.value)}/> 
      </div>
      <div>
        {/*<Datatable 
        data={search(data)}
        />
        <Tableslist tableData={search (tableData)}/>
      </div>
    </div>
  );
}
*/
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
          <Tableslist tableData={tableData} />
        </div>
        <div class="col-1"></div>
      </div>
    </div>



  );
}

