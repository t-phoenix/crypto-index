import React from "react";
import '../../styles/common.css';
import {motion} from 'framer-motion';

export default function SubNav({options, selectedOption, setSelectedOption}){
    

    return(
        <div className="subnav-container">
            {options.map((option, index) => (
              <>
              {option.id === selectedOption.id ? 
              <div className="subnav-element selected-subnav-element">
                <p>{option.title}</p>
              </div>:
              <motion.div
                whileHover={{scale: 1.1}}
                whileTap={{scale: 0.9}}
                key={index}
                className="subnav-element"
                onClick={() => {
                  setSelectedOption(option)
                  console.log("Selected Option: ", option)
                }}
              >
                <p>{option.title}</p>
              </motion.div>
              }
              </>
            ))}
            
          </div>
    )
}

