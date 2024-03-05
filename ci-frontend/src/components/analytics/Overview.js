import React, {useRef} from "react";
import tether from "../../assets/usdt.svg"
import CiLogo from "../../assets/CiLogo.png";
import { useContractReads } from "wagmi"; 
import { index } from "../../constants/contractAddress";
import { SetTokenABI } from "../../abis/SetToken";
import {getBitcoinPrice, getEthereumPrice, getTetherPrice } from "../../services/geckoApi"
import { useScroll } from "framer-motion";


export default function Overview (){
  const {data} = useContractReads({
    contracts: [
      {
        address: index,
        abi: SetTokenABI,
        functionName: 'totalSupply'
      }
      
    ]
  })
  const [indexPrice, setIndexPrice] = React.useState("146700.8")
  const [aum, setAum] = React.useState("624230.56")

  // const [overviewData, setOverviewData] = React.useState([
  //   { title: "Asset Under Management", value: "47657990.95" },
  //   { title: "Token In Circulation", value: Number(data[0])/ 10**18},
  //   { title: "Index Price", value: "146700.8"},
  //   { title: "Denomination Asset", value: "USDT" },
  // ]);
  React.useEffect(()=>{
    setPrices()
  },[])

  async function setPrices(){
    try {
      const btcprice = await getBitcoinPrice();
      const ethprice = await getEthereumPrice();
      const usdtprice = await getTetherPrice();
      const indexprice = btcprice + 20*ethprice + 8000;
      console.log("Price of INDEX token:", indexprice)
      setIndexPrice(indexprice)
      if(data){
        setAum((data[0]/10**18)*indexprice)
      }
      
    } catch (error) {
      console.log("Error setting data:", error)
    }
    
  }
  const carouselRef = useRef(null)
const { scrollX } = useScroll({
  container: carouselRef
})

    return(
        <div className="center-in-row" ref={carouselRef}>
          <div className="small-box">
            <h3 className="box-data">${Number(aum).toLocaleString()}</h3>
            <p className="box-title">Asset Under Management</p>
          </div>
          <div className="small-box">
            <h3 className="box-data">🪙 {data ? Number(data[0]/10**18).toLocaleString(): 4.27} INDEX</h3>
            <p className="box-title">Token In Circulation</p>
          </div>
          <div className="small-box">
            <h3 className="box-data"><img src={CiLogo} style={{height: '28px',marginRight: '6px'}}/>${Number(indexPrice).toLocaleString()}</h3>
            <p className="box-title">Index Price</p>
          </div>
          <div className="small-box">
            <h3 className="box-data"><img src= {tether} style={{marginRight: '6px'}}/> USDT</h3>
            <p className="box-title">Denomination Asset</p>
          </div>
        </div>
    )
}