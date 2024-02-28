import React from "react";
import "../styles/common.css";

export default function MultiAsset({ outputAmount, outputTokensList }) {
  return (
    <div className="input-box" style={{}}>
      <div
        className="wide-apart-row"
        style={{ marginTop: '2%', marginBottom: '4%'}}
      >
        <p><b>Required Asssets</b></p>
        <p><b>Balance</b></p>
      </div>

      {outputTokensList.map((token) => (
        <div
          className="wide-apart-row"
          style={{
            paddingBlock: '4px',
            paddingInline: '8px',
            fontSize: '14px',
            borderRadius: '10px',
            backgroundColor: Number(outputAmount[token.symbol]) > Number(token.balance) ? "#B80C09": ""
          }}
        >
          <div className="center-in-row">
            <img src={token.src} style={{width: '20px'}}/>
            <p>{token.name}: </p>
            <p>{outputAmount[token.symbol]}</p>
          </div>
          <div className="center-in-row">
            <p>
              {token.balance} {token.symbol}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
