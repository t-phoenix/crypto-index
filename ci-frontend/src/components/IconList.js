import React from "react";
import Icon from 'react-crypto-icons';

export default function IconList(){
    const iconList = ["btc", "eth", "etc", "usdt", "bnb", "sol", "xrp", "usdc", "ada", "avax", "trx", "doge", "link", "matic", "dai", "bch", "ltc", "uni", "leo", "fil", "stx", "dot"  ]

    return(
        <div style={{marginBlock: '30vh'}}>
        {iconList.map((iconName, index)=>(
            
            <Icon key={index} name={iconName} size={50}/>
          ))}
          </div>
    )
}

{/* Icon params */}
{/* "name", "size", "onCompleted", "onError" */}