import React from "react";
import {motion} from 'framer-motion';
import "../styles/common.css";
import AssetMenu from "./common/AssetMenu";
import {MdAccountBalanceWallet} from 'react-icons/md'

export default function InputBox({ inputAmout, setInputAmount, inputAmtValue, setInputAmtValue, isMultiAsset, selectedAsset, setSelectedAsset, tokensList }) {
  const [showAssetList, setShowAssetList] = React.useState(false);
  
  function onInputChange(e) {
    setInputAmount(e.target.value);
    setInputAmtValue(e.target.value * selectedAsset.price);
  }

  function handleSelectAsset() {
    setShowAssetList(!showAssetList);
  }

  return (
    <div className="input-box" style={{marginBlock: '-10px'}}>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          
        }}
      >
        <input
          
          value={inputAmout}
          onChange={onInputChange}
          type="integer"
          placeholder="0.0"
          style={{
            margin: "5px",
            backgroundColor: "transparent",
            color: "#C0DA74",
            width: "50%",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
            width: "30%",
          }}
        >
          {tokensList.length ===1  ? 
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
          )}
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
          <MdAccountBalanceWallet size={20} style={{marginRight: '2px'}}/> : {selectedAsset.balance} {selectedAsset.symbol}
        </p>
      </div>
    </div>
  ); 
}
