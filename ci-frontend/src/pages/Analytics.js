import React from "react";
import "../styles/analytics.css";

import Overview from "../components/Overview";
import HistoryGraph from "../components/HistoryGraph";
 


export default function Analytics() {
  const overviewData = [
    { title: "Asset Under Management", data: "47657990.95" },
    { title: "Token In Circulation", data: "32846" },
    { title: "Average Monthly Return", data: "+13.56%" },
    { title: "Denomination Asset", data: "USDT" },
  ];

  return (
    <div className="main-content">
      <div style={{ width: "900px", textAlign: "start" }}>
        <h1>Crypto INDEX Fund</h1>
        <p style={{ width: "60%", fontSize: "14px", marginBlock: "8px", marginLeft: '0px' }}>
          A balanced Crypto Index Fund to simplify Crypto Investments in a
          structured format to mitigate the risks.
        </p>
        <Overview />
        <HistoryGraph />

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
