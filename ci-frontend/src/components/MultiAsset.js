import React from "react";
import "../styles/common.css";
import {motion} from 'framer-motion';
import { FaFaucetDrip } from "react-icons/fa6";
import { BsFillLightningChargeFill } from "react-icons/bs";
import { useAccount } from "wagmi";
import { writeContract, prepareWriteContract } from "@wagmi/core"
import { ERCToken_ABI } from "../abis/ERCToken";
import toast from "react-hot-toast";
import { issue, usdt, wbtc, weth } from "../constants/contractAddress";
import {ethers} from 'ethers';




export default function MultiAsset({enableDelegate, outputAmount, outputTokensList }) {
  
  const account = useAccount()

  async function handleFaucet(token){
    console.log("Which faucte clicked: ", token)
    toast(`Processing`)
    switch (token.symbol) {
      case "BTC":
        console.log("BTC clickec")
        sendFaucetTrxn(wbtc, 3000000000000000000n) //3BTC
        break;
      case "ETH":
        console.log("ETH found")
        sendFaucetTrxn(weth, 60000000000000000000n) //60ETH
        break 
      case "USDT":
        console.log("USDT tapped") 
        sendFaucetTrxn(usdt, 24000000000000000000000n)  //24000USDt
      default:
        break;
    }
  }
  async function sendFaucetTrxn(tokenAddr, value){
    const config  = await prepareWriteContract({
      address: tokenAddr,
      abi: ERCToken_ABI,
      functionName: "mint",
      args: [account.address, value]
    })

    try {
      const {hash} = await writeContract(config)
      console.log("Token Mint Hash:" , hash)
      
      toast.success(`Tokens Minted Successfully at ${hash}`)
    } catch (error) {
      console.log("Could'nt mint Test Tokens: ", error)
      toast.error("Error! Test ERC Token NOT minted")
    }
    
  }

  async function handleDelegate(index, token){
    const balanceDifference = ethers.utils.parseUnits(String(token.balance), 'ether')
    console.log("Blance Difference:", balanceDifference )
    switch(index){
      case 0:
        console.log("Delegate Bitcoin");
        sendDelegateTrxn(wbtc, balanceDifference)
        break;
      case 1:
        console.log("Delegate Ethereum");
        sendDelegateTrxn(weth, balanceDifference)
        break;
      case 2:
        console.log("Delegate Tether");
        sendDelegateTrxn(usdt, balanceDifference)

        break;
      default:
        break;

    }
  }

  async function sendDelegateTrxn(tokenAddr, value){
    const config  = await prepareWriteContract({
      address: tokenAddr,
      abi: ERCToken_ABI,
      functionName: "approve",
      args: [issue, value]
    })

    try {
      const {hash} = await writeContract(config)
      console.log("Token Delegate Hash:" , hash)
      
      toast.success(`Tokens Delegated Successfully at ${hash}`)
      
    } catch (error) {
      console.log("Couldn't Delegatee Test Tokens: ", error)
      toast.error("Error! Test ERC Token NOT Delegated")
    }
    
  }

  return (
    <>
    {account.address ? 
    <div className="input-box">
      <div
        className="wide-apart-row"
        style={{ marginTop: '2%', marginBottom: '2%'}}
      >
        <p><b>Required Asssets</b></p>
        <p style={{display: 'flex', flexDirection: 'column', alignItems: 'end'}}><b>Balance</b> <p style={{fontSize: '10px'}}>(Delegated Balance)</p></p>
      </div>

      {outputTokensList.map((token, index) => (
        <div
          key={index}
          className="wide-apart-row"
          style={{
            marginBlock: '4px',
            paddingBlock: '4px',
            paddingInline: '8px',
            fontSize: '14px',
            borderRadius: '10px',
            backgroundColor: (enableDelegate && Number(outputAmount[token.symbol]) > Number(token.balance)) ? "": "",
            color:  (enableDelegate && Number(outputAmount[token.symbol]) > Number(token.delegateBalance)) ? "#fa908b": ""
          }}
        >
          <div className="center-in-row">
            <img src={token.src} style={{width: '26px', backgroundColor: "#303a4f", borderRadius: '25px', marginRight: '8px'}}/>
            <p style={{fontWeight: '600'}}>{token.name}: </p>
            <p style={{marginLeft: '4px'}}>{outputAmount[token.symbol]}</p>
          </div>
          <div className="center-in-row">
            <div className="end-in-column">
            <p>
              {Number(token.balance).toLocaleString()} {token.symbol}
            </p>
            {enableDelegate ? <p style={{fontSize: '10px'}}>{token.delegateBalance} {token.symbol}</p> : <></>}
            </div>
            {enableDelegate ? <div style={{display: 'flex', flexDirection: 'row'}}>
              <motion.div whileHover={{scale: 1.4}} whileTap={{scale: 0.8}} onClick={()=>handleFaucet(token)}>
                <FaFaucetDrip size={20} style={{marginLeft: '8px', color: '#a5e65a'}}/>
              </motion.div>
              <motion.div whileHover={{scale: 1.4}} whileTap={{scale: 0.8}} onClick={()=>handleDelegate(index, token)}>
                <BsFillLightningChargeFill size={20} style={{marginInline: '4px', color: '#a5e65a'}}/>
              </motion.div>
            </div> : <></>}
          </div>
        </div>
       
      ))}
      <br/>
      
      {enableDelegate ? <div style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'end', paddingRight: '10px'}}>
        <div className="center-in-row" >
        <FaFaucetDrip size={14} style={{marginRight: '4px', marginBlock: '4px'}}/>
        <p style={{fontWeight: '600', fontSize: '12px'}}> - Faucet </p>
        </div>
        <div className="center-in-row" style={{marginLeft: '16px'}}>
        <BsFillLightningChargeFill size={14} style={{marginRight: '2px', marginBlock: '4px'}} />
        <p style={{fontWeight: '600', fontSize: '12px'}}> - Delegate</p>
        </div>
      </div>: <></>}
    </div>
    :
    <div>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <p>Connect to BSC Testnet</p>
    <br/>
    </div>
    }
    </>
  );
}
