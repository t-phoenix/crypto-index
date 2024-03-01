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
          <div className="asset-button" style={{backgroundColor: "#303a4f", color: "#ffffff", borderColor: "#cccbcb", borderStyle: "solid"}}>
            <img src={selectedAsset.src} style={{width: '30px'}}/>
            <p style={{fontSize: '14px', fontWeight: '640'}}>{selectedAsset.symbol}</p>
          </div>
          
          {/* {tokensList.length ===1  ? 
          <div className="asset-button" style={{backgroundColor: "#303a4f", color: "#ffffff", borderColor: "#cccbcb", borderStyle: "solid"}}>
            <img src={selectedAsset.src} style={{width: '30px'}}/>
            <p style={{fontSize: '14px', fontWeight: '640'}}>{selectedAsset.symbol}</p>
          </div>:
          <motion.div className="asset-button" onClick={handleSelectAsset} whileHover={{scale: 1.1}} whileTap={{scale: 0.9}}>
            <img src={selectedAsset.src} style={{width: '30px'}}/>
            <p style={{fontSize: '14px', fontWeight: '640'}}>{selectedAsset.symbol}</p>
          </motion.div>}
          {showAssetList ? (
            <AssetMenu setShowAssetList={setShowAssetList}  setSelectedAsset={setSelectedAsset} tokensList={tokensList}/>
          ) : (
            <></>
          )} */}
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
