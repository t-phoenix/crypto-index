import React from "react";
import axios from "axios";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";
import "../styles/analytics.css"

export default function HistoryGraph() {
  const coinId = "bitcoin";
  const client = axios.create({ baseURL: "https://api.coingecko.com/api/v3" });
  const coins = [
    { id: "bitcoin", name: "Bitcoin", symbol: "btc" },
    { id: "ethereum", symbol: "eth", name: "Ethereum" },
    { id: "tether", symbol: "usdt", name: "Tether" },
  ];


  const [chartData, setChartData] = React.useState("");
//   const dataFORMAT = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}, ...];



  async function fetchHistoricalPriceData() {
    
    try {
      const result = await client.get(
        `/coins/${coinId}/market_chart?vs_currency=usd&days=7`
      );
      console.log(coinId, " price data: ", result.data.prices);
      const priceList = []
      for (let index = 0; index < result.data.prices.length; index++) {
        const element = result.data.prices[index];
        priceList.push({time: formatUNIXDate(element[0]), price: element[1]})
      }
      setChartData(priceList);
      localStorage.setItem(coinId, priceList)
    } catch (error) {
      console.log("Could not Historical Price Data: ", error);
    }
  }

  function getSavedData(){
    const result = localStorage.getItem(coinId)
    console.log("Retrieving Saved Data: ", result )
    setChartData(result)
  }

  function formatUNIXDate(unix_timestamp){
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds
    var date = new Date(unix_timestamp );

    var dateString = date.toLocaleString()
    var todateString = date.toLocaleDateString()
    // var todateString = date.toGMTString()
    var toTimeString = date.toLocaleTimeString()

    console.log(dateString, " : ", todateString, " : ", toTimeString);
    return todateString

  }

  return (
    <div>
      <p>Graph here</p>
      <button onClick={fetchHistoricalPriceData}>Price Data</button>
      <button onClick={getSavedData}>Get Saved Data</button>
      <div className="wide-apart-row">
        <div>
            {/* //SubNav1- Asset (BTC/ETH/USDT) */}
            
        </div>
        <div>
            {/* //SubNav2 - Time(1D/7D/30D/180/Max) */}
        </div>

      </div>
      <LineChart
        width={900}
        height={600}
        data={chartData}
        margin={{ top: 20, right: 20, bottom: 20, left: 5 }}
        strokeWidth={0.1}
        
      >
        <Line type="monotone" dataKey="price" stroke="#a5e65a" strokeWidth={3} dot={false} />
        <CartesianGrid strokeWidth={2} strokeDasharray="5 5 5"/>
        <XAxis dataKey="time" />
        <YAxis domain={['auto', 'auto']}/>
        <Tooltip cursor={{ stroke: 'red', strokeWidth: 2 }}/>
        <Legend />
      </LineChart>
    </div>
  );
}
