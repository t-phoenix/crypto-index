import React from "react";
import "../styles/common.css"
import {MdAccountBalanceWallet} from 'react-icons/md'

export default function OutBoxput({ inputAmout, setInputAmount, inputAmtValue, setInputAmtValue, selectedAsset, setSelectedAsset, tokensList }) {


  return (
    <div className="input-box" style={{marginTop: '-10px'}}>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h1 className="output-amount">{Number(inputAmout).toFixed(4)}</h1>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
            width: "30%",
          }}
        >
          <div className="asset-button" style={{backgroundColor: "#cccbcb"}}>
            <img src={selectedAsset.src} style={{width: '30px'}}/>
            <p style={{fontSize: '14px', fontWeight: '640'}}>{selectedAsset.symbol}</p>
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginLeft: "1vw",
          fontSize: "12px"
        }}
      >
        <p>$ {Number(inputAmtValue).toFixed(4)}</p>
        <p style={{marginRight: '8px', display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <MdAccountBalanceWallet size={22} style={{marginRight: '2px'}}/>: {selectedAsset.balance} {selectedAsset.symbol}
        </p>
      </div>
    </div>
  );
}
