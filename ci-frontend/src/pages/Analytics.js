import React from "react";
import "../styles/analytics.css";

import Overview from "../components/analytics/Overview";
import HistoryGraph from "../components/analytics/HistoryGraph";
import Composition from "../components/analytics/Composition";
import ContractInfo from "../components/analytics/ContractInfo";



export default function Analytics() {
  
  return (
    <div className="main-content">
      <div style={{ width: "800px",textAlign: "start"}}>
        <h1 style={{textAlign: 'start'}}>Crypto INDEX Fund</h1>
        <p style={{ width: "60%", fontSize: "14px", marginBlock: "8px", marginLeft: '0px' , textAlign: 'start'}}>
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
        <HistoryGraph /> 
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
