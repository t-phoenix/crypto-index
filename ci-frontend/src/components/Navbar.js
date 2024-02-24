import React from "react";
import { navlinks } from "../constants/navlinks";
import "../styles/header.css";
import { useNavigate } from "react-router-dom";


export default function Navbar({setShow}){
    const navigate = useNavigate();

    return(
        <div className="links-container">
            {navlinks.map((navlink) => (
              <div
                key={navlink.name}
                className="links-style"
                onClick={() => {
                    setShow(false)
                  navigate(navlink.link);
                }}
              >
                <p>{navlink.name}</p>
              </div>
            ))}
          </div>
    )
}


