import React from "react";
import "./forth.css";
import { motion } from "framer-motion";

export default function ForthSection() {
  const ref = React.useRef(null);

  return (
    <div className="forth-section-box">
      <motion.div className="card" 
        initial={{opacity: 0, translateX: -200}}
        whileInView={{opacity: 1, translateX: 0}}
        transition={{duration: 2}}
        >
        <h3 className="card-header">Why need a Crypto Index?</h3>
        <p className="card-content">
          Crypto Index provides a portfolio of less risky and market winning crypto assets. We provide expert insights and a user friendly platform that simplifies investment process.
        </p>
      </motion.div>
      <motion.div className="anim-container" 
        // initial={{opacity: 0, translateX: 400}}
        // whileInView={{opacity: 1, translateX: 0}}
        // transition={{duration: 2}}
        >
        <motion.div
          ref={ref}
          className="anim-circle"
          style={{backgroundColor: '#ff0055'}}
          animate={{ x: "calc(100% - 10%)" }}
          transition={{
            duration: 2,
            type: "spring",
            damping: 2.5,
            stiffness: 50,
            restDelta: 2,
            repeat: Infinity,
          }}
        />
        <motion.div
          ref={ref}
          className="anim-circle"
          style={{backgroundColor: '#00cc88'}}
          animate={{ x: "calc(100% - 10%)" }}
          transition={{
            duration: 2,
            type: "spring",
            damping: 1.5,
            stiffness: 50,
            restDelta: 4,
            repeat: Infinity,
          }}
        />
        <motion.div
          ref={ref}
          className="anim-circle"
          style={{backgroundColor: '#0099ff'}}
          animate={{ x: "calc(100% - 10%)" }}
          transition={{
            duration: 4,
            type: "spring",
            damping: 3.5,
            stiffness: 50,
            restDelta: 8,
            repeat: Infinity,
          }}
        />
      </motion.div>
    </div>
  );
}
