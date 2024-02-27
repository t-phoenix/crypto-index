import React from "react";
import {motion} from 'framer-motion'
import "../styles/common.css";
import InputBox from "../components/InputBox";
import blueLogo from "../assets/blueLogo.svg";
import { useAccount } from "wagmi";
import { Web3Button } from "@web3modal/react";
import MultiAsset from "../components/MultiAsset";


export default function DemoApp() {
    const account = useAccount();
    const tokensList =[{name:"Crypto Index", symbol: "INDEX", src: blueLogo , address: "", balance: "2", value: "200", price: "100"}] 

    const [inputAmout, setInputAmount] = React.useState("0.0");
    const [inputAmtValue, setInputAmtValue] = React.useState(0);
    const [selectedInputAsset, setSelectedInputAsset] = React.useState(tokensList[0]);

  return (
    <div className="main-content">
      <div className="trade-box">
        <br />
        <h1 style={{ textAlign: "start" }}>Mint</h1>
        <p
          style={{
            textAlign: "start",
            fontSize: "14px",
            color: "#a5e65a",
            marginBlock: "8px",
            fontWeight: "700",
          }}
        >
          〽️ 1 INDEX = 1BTC + 5ETH + 100 USDT
        </p>
        <br />
        <InputBox
          inputAmout={inputAmout} setInputAmount={setInputAmount} inputAmtValue={inputAmtValue} setInputAmtValue={setInputAmtValue} isMulyiAsset={false} selectedAsset={selectedInputAsset} setSelectedAsset={setSelectedInputAsset} tokensList={tokensList}
        />
        <MultiAsset />
        
        <br />
        <br />
        {account.address ? (
          <div className="center-in-row">
            <button>Fund</button>
          </div>
        ) : (
          <Web3Button />
        )}
        <br />
      </div>
    </div>
  );
}
