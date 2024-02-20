import React from "react";
import "../styles/header.css";
import { Web3Button } from "@web3modal/react";
import { useNetwork } from "wagmi";
import { useNavigate } from "react-router-dom";
import { navlinks } from "../constants/navlinks";
import { IoMenu } from "react-icons/io5";
import { useMediaQuery } from "react-responsive";

export default function Header() {
  const { chain } = useNetwork();
  const navigate = useNavigate();
  console.log("Chain: ", chain);
  const [showMenu, setShowMenu] = React.useState(false);


  const isMobile = useMediaQuery({ maxWidth: "1150px" });

  function openNavBar(){
    console.log("Show Menu variabel:", showMenu)
    setShowMenu(!showMenu)
  }

  return (
    <div className="header">
      {isMobile ? (
        <div className="header-container">
          <div className="nav-burger" onClick={openNavBar}>
            <IoMenu />
          </div>
          <div className="title-container" onClick={() => navigate("/")}>
            <h2 className="title">BLUE CHIP</h2>
            <p className="icon-title">by EquiLabs</p>
          </div>
        </div>
      ) : (
        <div className="header-container">
          <div className="title-container" onClick={() => navigate("/")}>
            <h2 className="title">BLUE CHIP</h2>
            <p className="icon-title">by EquiLabs</p>
          </div>
          <div className="links-container">
            {navlinks.map((navlink) => (
              <div
                key={navlink.name}
                className="links-style"
                onClick={() => {
                  navigate(navlink.link);
                }}
              >
                <p>{navlink.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      {
        showMenu? <div className="nav-menu">
            {navlinks.map((navlink) => (
              <div
                key={navlink.name}
                className="links-style-mobile"
                onClick={() => {
                    setShowMenu(false)
                  navigate(navlink.link);
                }}
              >
                <p>{navlink.name}</p>
              </div>
            ))}
        </div>: <></>
      }


      <div className="web3buttonContainer">
        <Web3Button />
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
      </div>
    </div>
  );
}
