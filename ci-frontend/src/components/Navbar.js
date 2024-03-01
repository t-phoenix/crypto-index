import React from "react";
import { navlinks } from "../constants/navlinks";
import "../styles/header.css";
import { useNavigate } from "react-router-dom";
import {motion} from 'framer-motion';

export default function Navbar({setShow}){
    const navigate = useNavigate();
    const [selectedLink, setSelectedLink] = React.useState('/')

    return(
        <div className="links-container">
            {navlinks.map((navlink) => (
              <div
                key={navlink.name}
                className="links-style"
                onClick={() => {
                  setShow(false)
                  setSelectedLink(navlink.link)
                  navigate(navlink.link);
                }}
              >
                <p>{navlink.name}</p>
              </div>
            ))}
          </div>
    )
}


// className={selectedLink==navlink.link? "selected-link":"links-style"}
// whileHover={{ scale: 1.1 }}
// whileTap={{scale: 0.9}}