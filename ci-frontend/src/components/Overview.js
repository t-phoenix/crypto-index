import React from "react";
import tether from "../assets/usdt.svg"
import blueLogo from "../assets/blueLogo.svg";

export default function Overview (){
    return(
        <div className="center-in-row">
          <div className="small-box">
            <h3 className="box-data">$47,657,990.96</h3>
            <p className="box-title">Asset Under Management</p>
          </div>
          <div className="small-box">
            <h3 className="box-data">🪙 32,846 INDEX</h3>
            <p className="box-title">Token In Circulation</p>
          </div>
          <div className="small-box">
            <h3 className="box-data"><img src={blueLogo} style={{height: '28px',marginRight: '6px'}}/>$1,450.95</h3>
            <p className="box-title">INDEX Price</p>
          </div>
          <div className="small-box">
            <h3 className="box-data"><img src= {tether} style={{marginRight: '6px'}}/> USDT</h3>
            <p className="box-title">Denomination Asset</p>
          </div>
        </div>
    )
}