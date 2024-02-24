import React from "react";
import Icon from 'react-crypto-icons';
import './iconlist.css';

export default function IconList(){
    const iconList = ["btc", "eth", "usdt", "bnb", "sol", "usdc", "ada", "avax", "trx", "doge", "link", "matic", "etc", "dai", "bch", "ltc", "uni", "leo", "fil", "stx", "vet", "okb", "ldo", "zil"   ]

    return(
        <div className="icon-box">
            {/* <h4>Invest Smart Enjoy Benchmark Returns</h4> */}
        {iconList.map((iconName, index)=>(
            
            <Icon key={index} name={iconName} size={50} className="crypto-icons"/>
          ))}
          
        </div>
    )
}

{/* Icon params */}
{/* "name", "size", "onCompleted", "onError" */}