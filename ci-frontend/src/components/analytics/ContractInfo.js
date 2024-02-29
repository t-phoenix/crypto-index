import React from "react";
import "../../styles/analytics.css";


export default function ContractInfo(){
    const contractAddr = [{name: "INDEX Token", address: "0x081C72c22cA0b69B0A047877318637E8254FEBFc"}, {name: "Controller", address: "0x081C72c22cA0b69B0A047877318637E8254FEBFc"}, 
                            {name: "Issuing Module", address: "0x081C72c22cA0b69B0A047877318637E8254FEBFc"}, {name: "Manager", address: "0x081C72c22cA0b69B0A047877318637E8254FEBFc"}] 

    const fee = [{type: "Entry", }]                        
    return(
        <div style={{marginBottom: '20%'}}>
            <h1>Contract Information</h1>
            <div className="composition-heading simple-row" >
                <p className="title-box">Contract</p>
                <p>Address</p>
            </div>

            {contractAddr.map((contractInfo)=>(
                <div className="composition-row simple-row">
                    <p className="title-box">{contractInfo.name}</p>
                    <a href={`https://testnet.bscscan.com/address/${contractInfo.address}`} target="blank">{contractInfo.address}</a>
                </div>
            ))}
                        
        </div>
    )
}

// Contract Addresses - Token/ Controller/ BIM/ Oracle
// Owner/Manager Address
// Fee - Entry/ Exit/ Protocol/ Management

