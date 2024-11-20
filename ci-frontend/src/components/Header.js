import React from "react";
import "../styles/header.css";
import { Web3Button } from "@web3modal/react";
import { useAccount, useNetwork } from "wagmi";
import { useNavigate } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { useMediaQuery } from "react-responsive";
import Navbar from "./Navbar";
import CiLogo from "../assets/CiLogo.png"
import { MdMenu } from "react-icons/md";


export default function Header() {
  const account = useAccount();
  const { chain } = useNetwork();
  const navigate = useNavigate();
  console.log("Chain: ", chain);
  const [showMenu, setShowMenu] = React.useState(false);

  const isMobile = useMediaQuery({maxWidth: "600px"})
  const isTab = useMediaQuery({ maxWidth: "992px" });

  function openNavBar(){
    console.log("Show Menu variabel:", showMenu)
    setShowMenu(!showMenu)
  }

  return (
    <div className="header">
      {isTab ? (
        // FOR MOBILE AND TAB
        <div className="header-container">
          <div className="nav-burger" onClick={openNavBar}>
            {<MdMenu size={40}/>}
          </div>
          <div className="title-container" onClick={() => {navigate("/"); setShowMenu(false);}}>
          {/* <img src={CiLogo} style={{width: '30px'}} alt="Crypto Index Logo"/> */}
            <h2 className="title">CRYPTO BASKET</h2>
            <p className="icon-title">by EquiLabs</p>
          </div>
        </div>
      ) : (
        // FOR LAPTOP
        <div className="header-container">
          <img src={CiLogo} style={{height: '48px'}} alt="logo" onClick={() => {navigate("/"); setShowMenu(false);}}/>
          <div className="title-container" onClick={() => {navigate("/"); setShowMenu(false);}}>
            <h2 className="title">RYPTO BASKET</h2>
            <p className="icon-title">by EquiLabs</p>

          </div>
          {<Navbar setShow={setShowMenu}/>}
        </div>
      )}
      {
        showMenu? <Navbar setShow={setShowMenu}/>: <></>
      }


      <div className="web3buttonContainer">
        <Web3Button />
        {isMobile? <></>: 
        <>
        {chain && (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <div className="online"></div>
            <p
              style={{
                fontSize: "12px",
                padding: 0,
                marginBlock: "6px",
                color: "#FBF9FF",
              }}
            >
              {chain.name}
            </p>
          </div>
        )}
        </>
        }
      </div>
    </div>
  );
}
