import React from "react";
import {motion} from 'framer-motion'
import "../styles/common.css";
import InputBox from "../components/InputBox";
import blueLogo from "../assets/blueLogo.svg";
import { useAccount } from "wagmi";
import { Web3Button } from "@web3modal/react";
import MultiAsset from "../components/MultiAsset";
import bitcoin from "../assets/btc.svg"
import ethereum from "../assets/eth.svg";
import tether from "../assets/usdt.svg"


export default function DemoApp() {
    const account = useAccount();
    //price of INDEX = 1 BTC + 5ETH + 100USDT
    const tokensList =[{name:"Crypto Index", symbol: "INDEX", src: blueLogo , address: "", balance: "2", value: "200", price: "100"}] 
    const outputTokensList = [{name:"Bitcoin", symbol: "BTC", src: bitcoin , address: "", balance: "0.0013", value: "68.90", price: "52315.54"}, {name:"Ethereum", symbol: "ETH", src:ethereum, address:"", balance: "0.14", value: "322", price: "3219.28" }, {name:"Tether", symbol:"USDT", src:tether, address:"", balance: "100", value: "100", price: "1.00"}]


    const [inputAmout, setInputAmount] = React.useState("0.0");
    const [inputAmtValue, setInputAmtValue] = React.useState(0);
    const [selectedInputAsset, setSelectedInputAsset] = React.useState(tokensList[0]);

    const [outputAmount, setOutputAmount] = React.useState({BTC: 0.0, ETH: 0.0, USDT: 0.0 })

    React.useEffect(()=>{
        setOutputAmount({
            BTC: inputAmout,
            ETH: 5 * inputAmout,
            USDT: 100 * inputAmout 
        })
    },[inputAmout])


  return (
    <div className="main-content">
      <div className="trade-box">
        <br />
        <h1 style={{ textAlign: "start" }}>Trade</h1>
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
        <MultiAsset outputAmount={outputAmount}  outputTokensList = {outputTokensList}/>
        
        
        <br />
        {account.address ? (
          <div className="center-in-row">
            <button>Fund</button>
          </div>
        ) : (
          <Web3Button />
        )}
        <br />
        <br />
      </div>
    </div>
  );
}
