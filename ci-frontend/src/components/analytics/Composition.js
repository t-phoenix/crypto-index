import React from "react";
import "../../styles/analytics.css";

export default function Composition(){
    const assetData = [{name: "Bitcoin", symbol: "BTC", balance: "23.67", price: "62137.58", change24H: "+9.6", value: "1470796.86", allocation: "32"}, 
                        {name: "Ethereum", symbol: "ETH", balance: "568.67", price: "3137.58", change24H: "+3.1", value: "1784247.36", allocation: "39"}, 
                        {name: "Tether", symbol: "USDT", balance: "1200806.12", price: "1.00", change24H: "-0.001", value: "1200806.12", allocation: "29"}]

    return(
        <div style={{marginBlock: '10%'}}>
            <h1 style={{marginBlock: '1%'}}>Token Holdings</h1>
            <div className="wide-apart-row composition-heading">
                {/* //Title */}
                <p>ASSET</p>
                <div style={{display: 'flex', flexDirection: 'row', width: '70%', justifyContent: 'space-evenly'}}>
                <p className="element-box">BALANCE</p>
                <p className="element-box">PRICE</p>
                <p className="element-box">CHANGE 24H</p>
                <p className="element-box">VALUE</p>
                <p className="element-box">ALLOCATION</p>
                </div>
            </div>
            
            {/* Assets */}
            {assetData.map((asset, index)=>(
                <div key={index} className="wide-apart-row composition-row">
                    <p style={{fontWeight: '700'}}>{asset.name}</p>
                    <div style={{display: 'flex', flexDirection: 'row', width: '70%', justifyContent: 'space-evenly'}}>
                    <p className="element-box">{Number(asset.balance).toLocaleString()} ({asset.symbol})</p>
                    <p className="element-box">$ {Number(asset.price).toLocaleString()}</p>
                    <p className="element-box">{asset.change24H} %</p>
                    <p className="element-box">$ {Number(asset.value).toLocaleString()}</p>
                    <p className="element-box">{asset.allocation} %</p>
                    </div>
                    
                </div>
            ))}
            


        </div>
    )
}