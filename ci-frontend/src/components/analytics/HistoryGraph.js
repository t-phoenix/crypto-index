import React, { useState } from "react";
import axios from "axios";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";
import "../../styles/analytics.css"
import { formatUNIXDate, formatUNIXTime } from "../../services/Formatter";
import SubNav from "../common/SubNav";
import toast from "react-hot-toast";

export default function HistoryGraph() {
  const coinId = "bitcoin";
  const client = axios.create({ baseURL: "https://api.coingecko.com/api/v3" });
  const coins = [
    { id: "bitcoin", symbol: "btc", title:"BTC", name: "Bitcoin" },
    { id: "ethereum", symbol: "eth", title:"ETH",  name: "Ethereum" },
    { id: "tether", symbol: "usdt", title:"USDT",  name: "Tether" },
  ];

  const timeperiods = [{id: 0, day:"1", title: "1D"}, {id: 1,day:"7", title: "7D"},{id: 2,day:"30", title: "30D"},{id: 3,day:"180", title: "180D"}, {id: 4,day:"max", title: "Max"}]
  

    const [chartData, setChartData] = React.useState("");
    //const dataFORMAT = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}, ...];
    const [selectedAsset, setSelectedAsset] = useState(coins[0])
    const [selectedTimePeriod, setSelectedTimePeriod] = useState(timeperiods[0])

    React.useEffect(()=>{
        fetchHistoricalPriceData(selectedAsset, selectedTimePeriod)
    },[selectedAsset, selectedTimePeriod])

  async function fetchHistoricalPriceData(asset, time) {
    
    try {
      const result = await client.get(
        `/coins/${asset.id}/market_chart?vs_currency=usd&days=${time.day}`
      );
      console.log(asset.id, " price data: ", result.data.prices);
      const priceList = []
      for (let index = 0; index < result.data.prices.length; index++) {
        const element = result.data.prices[index];
        priceList.push({date: formatUNIXDate(element[0]), time: formatUNIXTime(element[0]), price: element[1]})
      }
      setChartData(priceList);
      toast("Graph Updated")
    //   localStorage.setItem(coinId, priceList)
    } catch (error) {
      console.log("Could not Historical Price Data: ", error);
      toast(error)
    }
  }


  
  return (
    <div style={{marginBlock: '6%'}}>
      
      <div className="wide-apart-row">
        <SubNav options={coins} selectedOption={selectedAsset} setSelectedOption={setSelectedAsset}/>
        <SubNav options={timeperiods} selectedOption={selectedTimePeriod} setSelectedOption={setSelectedTimePeriod}/>
      </div>
      <LineChart
        width={900}
        height={600}
        data={chartData}
        margin={{ top: 20, right: 20, bottom: 20, left: 5 }}
        strokeWidth={0.1}
        
      >
        <Line animationDuration={10} type="monotone" dataKey="price" stroke="#a5e65a" strokeWidth={3} dot={false} />
        <CartesianGrid strokeWidth={2} strokeDasharray="5 8"/>
        <XAxis dataKey={selectedTimePeriod.id === 0 ?"time" : "date"} />
        <YAxis domain={['auto', 'auto']}/>
        <Tooltip cursor={{ strokeWidth:2 }} contentStyle={{backgroundColor: "#000", borderRadius: '10px'}}/>
        <Legend />
      </LineChart>
    </div>
  );
}
