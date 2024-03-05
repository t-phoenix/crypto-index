import React from "react";
import "../../styles/analytics.css";
import { useContractReads } from "wagmi";
import { index, usdt, wbtc, weth } from "../../constants/contractAddress";
import { ERCToken_ABI } from "../../abis/ERCToken";
import { getBitcoinPrice, getEthereumPrice, getTetherPrice } from "../../services/geckoApi";

export default function Composition(){
    const {data} = useContractReads({
        contracts: [
            {
                address: wbtc,
                abi: ERCToken_ABI,
                functionName: "balanceOf",
                args: [index]
            },
            {
                address: weth,
                abi: ERCToken_ABI,
                functionName: "balanceOf",
                args: [index]
            },
            {
                address: usdt,
                abi: ERCToken_ABI,
                functionName: "balanceOf",
                args: [index]
            }
        ]
    })
    const [btcPrice, setBTCPrice ] = React.useState("64034.56")
    const [ethPrice, setETHPrice ] = React.useState("4765.83")
    const [usdtPrice, setUSDTPrice ] = React.useState("1.001")

    const [ btcValue,  setBTCValue ] = React.useState("1470796.86")
    const [ ethValue,  setETHValue ] = React.useState("1784247.36")
    const [usdtValue, setUSDTValue ] = React.useState("1200806.12")

    const [btcAllocation, setBTCAllocation] = React.useState("32");
    const [ethAllocation, setETHAllocation] = React.useState("39");
    const [usdtAllocation, setUSDTAllocation] = React.useState("29");

    // console.log("INDEX CONTRACT BALANCE: ", Number(data[0]), Number(data[1]))
    const assetData = [{name: "Bitcoin", symbol: "BTC", balance: data ? Number(data[0])/10**18: "4.262", price: btcPrice, change24H: "+9.6", value: btcValue, allocation: btcAllocation}, 
                        {name: "Ethereum", symbol: "ETH", balance: data ? Number(data[1])/10**18: "85.24", price: ethPrice, change24H: "+3.1", value: ethValue, allocation: ethAllocation}, 
                        {name: "Tether", symbol: "USDT", balance: data ? Number(data[2])/10**18: "34096", price: usdtPrice, change24H: "-0.001", value: usdtValue, allocation: usdtAllocation}]

    React.useEffect(()=>{
        setPrices()
    },[])     
    async function setPrices(){
        try {
          const btcprice = await getBitcoinPrice();
          const ethprice = await getEthereumPrice();
          const usdtprice = await getTetherPrice();
          setBTCPrice(btcprice);
          setETHPrice(ethprice);
          setUSDTPrice(usdtprice);
          if(data){
            const btc_value = (Number(data[0])/10**18)*btcprice;
            const eth_value = (Number(data[1])/10**18)*ethprice;
            const usdt_value = (Number(data[2])/10**18)*usdtprice;
            const total_value = btc_value + eth_value + usdt_value;
            setBTCValue(btc_value)
            setETHValue(eth_value)
            setUSDTValue(usdt_value)
            setBTCAllocation(btc_value*100/total_value);
            setETHAllocation(eth_value*100/total_value);
            setUSDTAllocation(usdt_value*100/total_value); 
          } 
        } catch (error) {
          console.log("Error setting data:", error)
          setBTCPrice("64034.56");
          setETHPrice("4765.83");
          setUSDTPrice("1.001");
          setBTCValue("1470796.86")
          setETHValue("1784247.36")
          setUSDTValue("1200806.12")
          setBTCAllocation("31.3");
          setETHAllocation("38.6");
          setUSDTAllocation("28.1");  
        }
        
      }               

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
            {data && assetData.map((asset, index)=>(
                <div key={index} className="wide-apart-row composition-row">
                    <p style={{fontWeight: '700'}}>{asset.name}</p>
                    <div style={{display: 'flex', flexDirection: 'row', width: '70%', justifyContent: 'space-evenly'}}>
                    <p className="element-box">{Number(asset.balance).toLocaleString()} ({asset.symbol})</p>
                    <p className="element-box">$ {Number(asset.price).toLocaleString()}</p>
                    <p className="element-box">{asset.change24H} %</p>
                    <p className="element-box">$ {Number(asset.value).toLocaleString()}</p>
                    <p className="element-box">{Number(asset.allocation).toLocaleString()} %</p>
                    </div>
                    
                </div>
            ))}
            


        </div>
    )
}