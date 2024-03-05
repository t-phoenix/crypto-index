import React from "react";
import { motion } from "framer-motion";
import "../styles/common.css";
import InputBox from "../components/InputBox";
import CiLogo from "../assets/CiLogo.png";
import { useAccount, useChainId, useNetwork } from "wagmi";
import { Web3Button } from "@web3modal/react";
import MultiAsset from "../components/MultiAsset";
import SubNav from "../components/common/SubNav";
import bitcoin from "../assets/btc.svg";
import ethereum from "../assets/eth.svg";
import tether from "../assets/usdt.svg";
import { useContractReads } from "wagmi";
import { index, issue, usdt, wbtc, weth } from "../constants/contractAddress";
import { ERCToken_ABI } from "../abis/ERCToken";
import { SetTokenABI } from "../abis/SetToken";
import {
  getBitcoinPrice,
  getEthereumPrice,
  getTetherPrice,
} from "../services/geckoApi";
import { IoMdRefresh } from "react-icons/io";
import {prepareWriteContract, writeContract} from "@wagmi/core"
import { BasicIssueABI } from "../abis/BasicIssue";
import {ethers} from 'ethers';
import toast from "react-hot-toast";



export default function DemoApp() {
  const account = useAccount();
  const { chain } = useNetwork();
  // console.log("chain:", chain);
  const erctokenBalance = {
    abi: ERCToken_ABI,
    functionName: "balanceOf",
    args: [account.address],
  };
  const erctokenAllowance = {
    abi: ERCToken_ABI,
    functionName: "allowance",
    args: [account.address, issue],
  };
  const { data } = useContractReads({
    contracts: [
      {
        ...erctokenBalance,
        address: wbtc,
      },
      {
        ...erctokenBalance,
        address: weth,
      },
      {
        ...erctokenBalance,
        address: usdt,
      },
      {
        ...erctokenAllowance,
        address: wbtc,
      },
      {
        ...erctokenAllowance,
        address: weth,
      },
      {
        ...erctokenAllowance,
        address: usdt,
      },
      {
        address: index,
        abi: SetTokenABI,
        functionName: "balanceOf",
        args: [account.address],
      },
    ],
  });

  {
    data && console.log("Your INDEX Balance", Number(data[6]) / 10 ** 18);
  }

  const [indexPrice, setIndexPrice] = React.useState("146792.4");

  const tokensList = [
    {
      name: "Crypto Index",
      symbol: "INDEX",
      src: CiLogo,
      address: "",
      balance: data ? Number(data[6]) / 10 ** 18 : 0,
      value: "200",
      price: indexPrice,
    },
  ];
  const outputTokensList = [{  name: "Bitcoin",  symbol: "BTC",  src: bitcoin,  address: "",  balance: data && Number(data[0]) / 10 ** 18,  value: "68.90",  price: "52315.54",  delegateBalance: data && Number(data[3]) / 10 ** 18,},
                            {  name: "Ethereum",  symbol: "ETH",  src: ethereum,  address: "",  balance: data && Number(data[1]) / 10 ** 18,  value: "322",  price: "3219.28",  delegateBalance: data && Number(data[4]) / 10 ** 18,},
                            {  name: "Tether",  symbol: "USDT",  src: tether,  address: "",  balance: data && Number(data[2]) / 10 ** 18,  value: "100",  price: "1.00",  delegateBalance: data && Number(data[5]) / 10 ** 18,}];

  const appOptions = [
    { id: "mint", title: "MINT" },
    { id: "redeem", title: "REDEEM" },
  ];

  const [selectedAppOption, setSelectedAppOption] = React.useState(appOptions[0]);
  const [inputAmout, setInputAmount] = React.useState("0.0");
  const [inputAmtValue, setInputAmtValue] = React.useState(0);
  const [selectedInputAsset, setSelectedInputAsset] = React.useState(tokensList[0]);

  const [outputAmount, setOutputAmount] = React.useState({BTC: 0.0, ETH: 0.0, USDT: 0.0});

  React.useEffect(() => {
    setOutputAmount({
      BTC: inputAmout,
      ETH: 20 * inputAmout,
      USDT: 8000 * inputAmout,
    });
    getIndexPrice();
  }, [inputAmout]);

  async function getIndexPrice() {
    try {
      const btcprice = await getBitcoinPrice();
      const ethprice = await getEthereumPrice();
      const usdtprice = await getTetherPrice();
      const indexprice = btcprice + 20 * ethprice + 8000 * usdtprice;
      console.log("Price of INDEX token:", indexprice);
      setIndexPrice(indexprice);
    } catch (error) {
      console.log("Error setting data:", error);
    }
  }

  async function handleMint(){
    toast('Iniitiating...')
    const mintValue = ethers.utils.parseUnits(inputAmout, 'ether')
    console.log("Mint Value in Ethers", mintValue)

    const config = await prepareWriteContract({
      address:issue,
      abi: BasicIssueABI,
      functionName: "issue",
      args: [index, mintValue, account.address]
    })

    try {
      const { hash } = await writeContract(config);
      console.log("Mint INDEX Hash:", hash);
      toast.success(`INDEX MINT Successfully: ${hash}`)
    } catch (error) {
      console.log("Error! While minting INDEX tokens",error);
      toast.error("Error! could not mint INDEX Tokens");
    }
  }

  async function handleRedeem(){
    toast('Iniitiating...')
    const redeemValue = ethers.utils.parseUnits(inputAmout, 'ether')
    console.log("Mint Value in Ethers", redeemValue)

    const config = await prepareWriteContract({
      address:issue,
      abi: BasicIssueABI,
      functionName: "redeem",
      args: [index, redeemValue, account.address]
    })

    try {
      const { hash } = await writeContract(config);
      console.log("Redeem INDEX Hash:", hash);
      toast.success(`INDEX Redeem Successful  ${hash}`)
    } catch (error) {
      console.log("Error! While Redeeming INDEX tokens",error);
      toast.error("Error! could not redeem INDEX Tokens");
    }
  }









  return (
    <div className="main-content">
      <div className="trade-box">
        <div className="wide-apart-row">
        <div>
        {selectedAppOption.id === "mint" ? (
          <h1 style={{ textAlign: "start" }}>Mint INDEX</h1>
        ) : (
          <h1 style={{ textAlign: "start" }}>Redeem INDEX</h1>
        )}
        <p style={{ textAlign: "start", fontSize: "12px" }}>
          Test the app with Basic Issue Module (Testnet)
        </p>
        <p
          style={{
            textAlign: "start",
            fontSize: "14px",
            color: "#a5e65a",
            marginBlock: "8px",
            fontWeight: "700",
          }}
        >
          〽️ 1 INDEX = 1 BTC + 20 ETH + 8000 USDT
        </p>
        </div>
        <motion.div onClick={()=>window.location.reload()} whileHover={{rotate: '270deg', scale: 1.2}} transition={{duration: 0.3}} whileTap={{scale: 0.8}} style={{x: "-20px", y: "20px", borderRadius: '10px', backgroundColor: '#303a4f', height: "36px", width: '36px',display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '4px', marginLeft: '6vw'}}>
          <IoMdRefresh size={24}/>
        </motion.div>
        </div>
        <br />
        <SubNav
          options={appOptions}
          selectedOption={selectedAppOption}
          setSelectedOption={setSelectedAppOption}
        />
        <br />
        <br />
        {data && (
          <InputBox
            inputAmout={inputAmout}
            setInputAmount={setInputAmount}
            inputAmtValue={inputAmtValue}
            setInputAmtValue={setInputAmtValue}
            isMulyiAsset={false}
            selectedAsset={selectedInputAsset}
            setSelectedAsset={setSelectedInputAsset}
            tokensList={tokensList}
          />
        )}
        {data && (
          <MultiAsset
            enableDelegate={selectedAppOption.id === "mint" ? true : false}
            outputAmount={outputAmount}
            outputTokensList={outputTokensList}
          />
        )}

        <br />
        {account.address ? (
          <>
            {chain.id === 97 ? (
              <div className="center-in-row">
                {selectedAppOption.id === "mint" ? (
                  <button onClick={handleMint}>Mint</button>
                ) : (
                  <button onClick={handleRedeem}>Redeem</button>
                )}
              </div>
            ) : (
              <p>Please connect to BSC Testnet</p>
            )}
          </>
        ) : (
          <Web3Button />
        )}
        <br />
        <br />
      </div>
    </div>
  );
}
