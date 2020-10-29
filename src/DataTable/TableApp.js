// List of imports
import React , { useState, useEffect } from 'react'
import axios from 'axios'
import Datatable from './datatable'

//Allows you to connect with QRest and pass the authentication so we can make queries
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
  "query": "select last price by sym from trade where time.date =.z.d",
  "type": "sync",
  "response": true
  } 
} 

//{window.location.reload(false);}
//Axios finds the output from your QRest query and logs it in the console to allow for checking that the output is what you expect
axios(options)
  .then(response => {
    console.log(response);
  })

//defines our App function, everything inside this can be rendered
export default function App() {
  //Defines two states: Our data state and our q state, useState requires two arguments;the name of the state and the change state function, 
  //I've called these "data" and "setData". It also requires a default value so I've just given it an empty array
  const [data, setData] = useState([])
  //The q state allows us to filter with the search bar, I've given it a default value of an empty string
  const [q, setQ] = useState("")
 //Use effect allows us to map the results from our qRest query into our data state. The options constant parameter is defined at the top containing
 //all our qRest information. The p => p means that each member of our array is mapped to the state.
 
 //useEffect(() => {
  // axios(options).then(res => {
   // setData(res.data.result.map(p => p))
    
 // })
 //}, []);
  useEffect(() => {
    const timer = setInterval(() => {
      axios(options).then(res => {
        setData(res.data.result.map(p => p))
      })
    },1000);
              //clearing interval
    return () => clearInterval(timer);
  });
//This function is related to the search bar. The .LowerCase functions allow for queries in the search bar to be case insensitive. The row.sym ensures
//That only the sym is being filtered
 function search(rows) {
   return rows.filter(row => row.sym.toLowerCase().indexOf(q.toLowerCase()) > -1) 
 }
//This defines what we return on the screen. The input line creates a search bar and the <Datatable data={data} />  line displays the Datatable component
  return (
    <div>
      <div>
        <input type="text" value={q} onChange={(e) => setQ(e.target.value)}/> 
      </div>
      <div>
        <Datatable data={search(data)} />
      </div>
    </div>
  );
}
//{window.location.reload(false);}
