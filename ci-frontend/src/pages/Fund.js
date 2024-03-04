import React from "react";
import {motion} from 'framer-motion'
import toast from "react-hot-toast";
import "../styles/common.css";
import InputBox from "../components/InputBox";
import CiLogo from "../assets/CiLogo.png";
import bitcoin from "../assets/btc.svg"
import ethereum from "../assets/eth.svg";
import tether from "../assets/usdt.svg"
import OutBoxput from "../components/OutputBox";
import { useAccount } from "wagmi";
import { Web3Button } from "@web3modal/react";

export default function Fund() {
    const account = useAccount()
    console.log("Current Account:", account)

    const tokensList = [{name:"Bitcoin", symbol: "BTC", src: bitcoin , address: "", balance: "0.0013", value: "68.90", price: "52315.54"}, {name:"Ethereum", symbol: "ETH", src:ethereum, address:"", balance: "0.14", value: "322", price: "3219.28" }, {name:"Tether", symbol:"USDT", src:tether, address:"", balance: "100", value: "100", price: "1.00"}]
    const tokensList2 =[{name:"Crypto Index", symbol: "INDEX", src: CiLogo , address: "", balance: "2", value: "200", price: "100"}] 
   
    const [isInputINDEX, setIsInputINDEX] = React.useState(false)

    const [inputAmout, setInputAmount] = React.useState("0.0");
    const [inputAmtValue, setInputAmtValue] = React.useState(0);
    const [selectedInputAsset, setSelectedInputAsset] = React.useState(tokensList[0]);
    
    const [outputAmout, setOutputAmount] = React.useState("0.0")
    const [outputAmtValue, setOutputAmtValue] = React.useState(0);
    const [selectedOutputAsset, setSelectedOutputAsset] = React.useState(tokensList2[0])

    
    React.useEffect(()=>{
        const calculatedOutputAmount = inputAmout*selectedInputAsset.price/selectedOutputAsset.price
        setOutputAmount(calculatedOutputAmount);
        setOutputAmtValue(calculatedOutputAmount*selectedOutputAsset.price)
        // const calculateInputAmount = outputAmout*selectedOutputAsset.price/selectedInputAsset.price
        // setInputAmount(calculateInputAmount)
    }, [inputAmout])

    function changeAssets(){
        setIsInputINDEX(!isInputINDEX)
        setSelectedInputAsset(selectedOutputAsset)
        setSelectedOutputAsset(selectedInputAsset)
        setInputAmount(0.0)
        setOutputAmount(0.0)
        setInputAmtValue(0.0)
    }

    function buyINDEX(){
        toast(`${outputAmout} INDEX minted succesfully. \n Transaction:  ${account.address}`)
    }


  return (
    <div className="main-content">

      <div className="trade-box">
        <br/>
        <h1 style={{ textAlign: "start" }}>Swap</h1>
        <p style={{ textAlign: "start", fontSize: '12px' }}>Swap the token directly with assets (coming soon)</p>
        <p
          style={{
            textAlign: "start",
            fontSize: "14px",
            color: "#a5e65a",
            marginBlock: "8px",
            fontWeight: "700",
          }}
        >
          〽️ 1 INDEX = $100
        </p>
        <br/>
        <br/>
        <br/>
        <InputBox inputAmout={inputAmout} setInputAmount={setInputAmount} inputAmtValue={inputAmtValue} setInputAmtValue={setInputAmtValue} selectedAsset={selectedInputAsset} setSelectedAsset={setSelectedInputAsset} tokensList={isInputINDEX? tokensList2 : tokensList}/>
        <div className="center-in-row" >
            <motion.p whileHover={{scale: 1.2}} whileTap={{scale: 0.8}} onClick={changeAssets} style={{width: '30px', fontSize: '24px', fontWeight: '700', backgroundColor: "#a5e65a", color: '#000000', borderRadius: '8px'}}>↕</motion.p>
        </div>
        <InputBox inputAmout={outputAmout} setInputAmount={setOutputAmount} inputAmtValue={outputAmtValue} setInputAmtValue={setOutputAmtValue} selectedAsset={selectedOutputAsset} setSelectedAsset={setSelectedOutputAsset} isOutput={true} tokensList={isInputINDEX? tokensList: tokensList2}/>
        <br/>
        <br/>
        <br/>
        <div style={{textAlign: 'start', fontSize: '12px', marginLeft: '4px'}}>
            <p><b>Deposit:</b> {isInputINDEX ? Number(outputAmout).toFixed(6): Number(inputAmout).toFixed(6)} {isInputINDEX ? selectedOutputAsset.symbol: selectedInputAsset.symbol}</p>
            <p style={{marginBlock: '4px'}}><b>You Receive:</b> {isInputINDEX ? Number(inputAmout).toFixed(6): Number(outputAmout).toFixed(6)} {isInputINDEX ? selectedInputAsset.symbol : selectedOutputAsset.symbol}</p>
            <p><b>Total Value:</b> ${inputAmtValue}</p>
        </div>
        <br/>
        <br/>
        <div className="center-in-row" >
        <button style={{backgroundColor: "#cccbcb"}}>Coming Soon</button>
        </div>
        {/* {account.address ? <div className="center-in-row"><button onClick={buyINDEX}>Fund</button></div> : <Web3Button />} */}
        
        <br/>
        <br/>
      </div>
    </div>
  );
}
