import React from "react";
import {motion} from "framer-motion";

export default function AssetMenu({setShowAssetList, setSelectedAsset, tokensList}){
    return(
        <div className="asset-list-box">
              <p>Select a token</p>
              <p style={{ fontSize: "10px" }}>
                select a token from our default list
              </p>
              {tokensList.map((token) => (
                <motion.div
                  whileHover={{scale: 1.1}}
                  whileTap={{scale: 0.9}}
                  className="asset-list-element"
                  onClick={() => {
                    setShowAssetList(false);
                    setSelectedAsset(token);
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <img src={token.src} style={{width: '30px'}}/>
                    <div className="asset-list-header">
                      <p style={{ padding: "0px" }}>{token.symbol}</p>
                      <p style={{ fontSize: "10px", marginLeft: "2px" }}>
                        {token.name}
                      </p>
                    </div>
                  </div>
                  <div className="asset-list-tail">
                    <p>{token.balance}</p>
                    <p style={{ fontSize: "10px" }}>$ {token.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>
    )
}