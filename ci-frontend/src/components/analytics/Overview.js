import React from "react";
import tether from "../../assets/usdt.svg"
import CiLogo from "../../assets/CiLogo.png";

export default function Overview ({data}){
    return(
        <div className="center-in-row">
          <div className="small-box">
            <h3 className="box-data">${Number(data[0].value).toLocaleString()}</h3>
            <p className="box-title">{data[0].title}</p>
          </div>
          <div className="small-box">
            <h3 className="box-data">🪙 {Number(data[1].value).toLocaleString()} INDEX</h3>
            <p className="box-title">{data[1].title}</p>
          </div>
          <div className="small-box">
            <h3 className="box-data"><img src={CiLogo} style={{height: '28px',marginRight: '6px'}}/>${Number(data[2].value).toLocaleString()}</h3>
            <p className="box-title">{data[2].title}</p>
          </div>
          <div className="small-box">
            <h3 className="box-data"><img src= {tether} style={{marginRight: '6px'}}/> {data[3].value}</h3>
            <p className="box-title">{data[3].title}</p>
          </div>
        </div>
    )
}