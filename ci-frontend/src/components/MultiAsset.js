import React from "react";
import "../styles/common.css";
import {motion} from 'framer-motion';
import { FaFaucetDrip } from "react-icons/fa6";
import { BsFillLightningChargeFill } from "react-icons/bs";
import { useAccount } from "wagmi";





export default function MultiAsset({enableDelegate, outputAmount, outputTokensList }) {
  
  const account = useAccount()

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

      {outputTokensList.map((token) => (
        <div
          className="wide-apart-row"
          style={{
            marginBlock: '4px',
            paddingBlock: '4px',
            paddingInline: '8px',
            fontSize: '14px',
            borderRadius: '10px',
            backgroundColor: (enableDelegate && Number(outputAmount[token.symbol]) > Number(token.balance)) ? "": "",
            color:  (enableDelegate && Number(outputAmount[token.symbol]) > Number(token.balance)) ? "#fa908b": ""
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
              {token.balance} {token.symbol}
            </p>
            {enableDelegate ? <p style={{fontSize: '10px'}}>{token.delegateBalance} {token.symbol}</p> : <></>}
            </div>
            {enableDelegate ? <div style={{display: 'flex', flexDirection: 'row'}}>
              <motion.div whileHover={{scale: 1.4}} whileTap={{scale: 0.8}}>
                <FaFaucetDrip size={20} style={{marginLeft: '8px', color: '#a5e65a'}}/>
              </motion.div>
              <motion.div whileHover={{scale: 1.4}} whileTap={{scale: 0.8}}>
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
        <BsFillLightningChargeFill size={14} style={{marginRight: '4px', marginBlock: '4px'}} />
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
