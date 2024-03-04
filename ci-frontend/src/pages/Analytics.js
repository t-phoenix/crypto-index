import React from "react";
import "../styles/analytics.css";

import Overview from "../components/analytics/Overview";
import HistoryGraph from "../components/analytics/HistoryGraph";
import Composition from "../components/analytics/Composition";
import ContractInfo from "../components/analytics/ContractInfo";
import { useContractReads } from "wagmi"; 
import { index } from "../constants/contractAddress";
import { SetTokenABI } from "../abis/SetToken";
import {getBitcoinPrice, getEthereumPrice, getTetherPrice } from "../services/geckoApi"


export default function Analytics() {
  const {data} = useContractReads({
    contracts: [
      {
        address: index,
        abi: SetTokenABI,
        functionName: 'totalSupply'
      }
      
    ]
  })

  const [overviewData, setOverviewData] = React.useState([
    { title: "Asset Under Management", value: "47657990.95" },
    { title: "Token In Circulation", value: Number(data[0])/ 10**18},
    { title: "Index Price", value: "146700.8"},
    { title: "Denomination Asset", value: "USDT" },
  ]);
  //1 BTC, 20 ETH 8000 USDT
  // console.log("Total INDEX token supply: ", data[0])

  
  
  

  


  return (
    <div className="main-content">
      <div style={{ width: "900px", textAlign: "start" }}>
        <h1>Crypto INDEX Fund</h1>
        <p style={{ width: "60%", fontSize: "14px", marginBlock: "8px", marginLeft: '0px' }}>
          A balanced Crypto Index Fund to simplify Crypto Investments in a
          structured format to mitigate the risks. (Testnet)
        </p>
        
        <p
          style={{
            textAlign: "start",
            fontSize: "14px",
            color: "#a5e65a",
            marginTop: "24px",
            fontWeight: "700",
          }}
        >
          〽️ 1 INDEX = 1 BTC + 20 ETH + 8000 USDT
        </p>
        
        
        <br/>
        <Overview />
        {/* <HistoryGraph /> */}
        <Composition />
        <ContractInfo />


      </div>
    </div>
  );
}

// TODO
// AUM / Token in Circulation/ AVG Return / Denomination
// Graph - AUM / share Price / Seperate Component Graphs
// Components (BTC/ETH/USDT) - AUM/ Price/ Value
// Contract Info
// Activity - Deposit/ Redemption
