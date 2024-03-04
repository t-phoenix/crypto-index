import React from "react";
import {motion} from 'framer-motion'
import "../styles/common.css";
import InputBox from "../components/InputBox";
import CiLogo from "../assets/CiLogo.png";
import { useAccount } from "wagmi";
import { Web3Button } from "@web3modal/react";
import MultiAsset from "../components/MultiAsset";
import SubNav from "../components/common/SubNav";
import bitcoin from "../assets/btc.svg"
import ethereum from "../assets/eth.svg";
import tether from "../assets/usdt.svg"
import { useContractReads } from "wagmi";
import { issue, usdt, wbtc, weth } from "../constants/contractAddress";
import { ERCToken_ABI } from "../abis/ERCToken";


export default function DemoApp() {
    const account = useAccount();
    const erctokenBalance = {
      abi: ERCToken_ABI,
      functionName: 'balanceOf',
      args: [account.address]
    }
    const erctokenAllowance ={
      abi: ERCToken_ABI,
      functionName: 'allowance',
      args: [account.address, issue]
    }
    const {data} = useContractReads({
      contracts: [
        {
          ...erctokenBalance,
          address: wbtc,
        },
        {
          ...erctokenBalance,
          address: weth,  
        },
        {
          ...erctokenBalance,
          address: usdt,
        },
        {
          ...erctokenAllowance,
          address: wbtc,
        },
        {
          ...erctokenAllowance,
          address: weth,
        },
        {
          ...erctokenAllowance,
          address: usdt
        }
      ]
    })

    {data && console.log("Your BTC and ETH Balance",  Number(data[3])/10**18, Number(data[4])/10**18)}
    


    const tokensList =[{name:"Crypto Index", symbol: "INDEX", src: CiLogo , address: "", balance: "2", value: "200", price: "100"}] 
    const outputTokensList = [{name:"Bitcoin", symbol: "BTC", src: bitcoin , address: "", balance: data && Number(data[0])/10**18, value: "68.90", price: "52315.54", delegateBalance: data && Number(data[3])/10**18}, 
                              {name:"Ethereum", symbol: "ETH", src:ethereum, address:"", balance: data && Number(data[1])/10**18, value: "322", price: "3219.28", delegateBalance: data && Number(data[4])/10**18 }, 
                              {name:"Tether", symbol:"USDT", src:tether, address:"", balance: data && Number(data[2])/10**18, value: "100", price: "1.00", delegateBalance: data && Number(data[5])/10**18}]

    const appOptions = [{id: 'mint', title: "MINT"}, {id: "redeem", title: "REDEEM"}]

    const [selectedAppOption, setSelectedAppOption] = React.useState(appOptions[0])
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
        {selectedAppOption.id === "mint" ? <h1 style={{ textAlign: "start" }}>Mint INDEX</h1> : <h1 style={{ textAlign: "start" }}>Redeem INDEX</h1>}
        <p style={{ textAlign: "start", fontSize: '12px' }}>Test the app with Basic Issue Module (Testnet)</p>
        <p
          style={{
            textAlign: "start",
            fontSize: "14px",
            color: "#a5e65a",
            marginBlock: "8px",
            fontWeight: "700",
          }}
        >
          〽️ 1 INDEX = 1 BTC + 20 ETH + 8000 USDT
        </p>
        <br/>
        <SubNav options={appOptions} selectedOption={selectedAppOption} setSelectedOption={setSelectedAppOption}/>
        <br/>
        <br/>
        <InputBox
          inputAmout={inputAmout} setInputAmount={setInputAmount} inputAmtValue={inputAmtValue} setInputAmtValue={setInputAmtValue} isMulyiAsset={false} selectedAsset={selectedInputAsset} setSelectedAsset={setSelectedInputAsset} tokensList={tokensList}
        />
        {data && <MultiAsset enableDelegate={selectedAppOption.id === "mint" ? true : false} outputAmount={outputAmount}  outputTokensList = {outputTokensList}/>}
        
        
        <br />
        {account.address ? (
          <div className="center-in-row">
            {selectedAppOption.id === "mint" ? <button>Mint</button>: <button>Redeem</button>}
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
