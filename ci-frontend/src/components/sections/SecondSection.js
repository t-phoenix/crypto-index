import React from "react";
import "./second.css";
import BoxDesign from "../designs/BoxDesign";
import {motion} from 'framer-motion';
import { MdDashboard, MdMobileFriendly, MdOnDeviceTraining, MdRefresh, MdSavings, MdVerified } from "react-icons/md";
import ShapeShift from "../designs/ShapeShift";

export default function SecondSection() {
  return (
    <div className="second-section-box">
      <motion.div 
        className="card" 
        initial={{opacity: 0, translateX: -200}}
        whileInView={{opacity: 1, translateX: 0}}
        transition={{duration: 2, ease: 'easeInOut'}}
        >
        <h3 className="card-header">What is Crypto Basket?</h3>
        <p className="card-content">
          In simple words, crypto basket a cryptocurrency index fund which helps you
          invest in cryptocurreny with a safe and diversified portfolio.
        </p>
        <div className="info-grid">
          <motion.div className="info-grid-box" whileHover={{scale: 1.05}}>
            <MdOnDeviceTraining size={40} className="icon-style"/>
            <h3>Mobile Friendly</h3>
          </motion.div>
          <motion.div className="info-grid-box" whileHover={{scale: 1.05}}>
            <MdRefresh size={40} className="icon-style"/> 
            <h3>Auto Rebalancing</h3>
          </motion.div>
          <motion.div className="info-grid-box" whileHover={{scale: 1.05}}>
            <MdVerified size={40} className="icon-style"/>
            <h3>Benchmark Returns</h3>
          </motion.div>
          <motion.div className="info-grid-box" whileHover={{scale: 1.05}}>
            <MdDashboard size={40} className="icon-style"/>
            <h3>Structured Product</h3>
          </motion.div>
        </div>
        <div className="end-box">
            <h2 className="endbox-title">Get Invested <MdSavings size={28} style={{marginBottom: '-4px'}}/></h2>
            <p>We Promise you, your every single penny will be invested stratigically.</p>
          </div>
      </motion.div>
      {/* <BoxDesign /> */}
      <ShapeShift />
    </div>
  );
}


const cardData = [
    {
        id: "a",
        title: "What is Crypto Index?",
        content: "In simple words, its a cryptocurrency index fund which helps you invest in cryptocurreny with a safe and diversified portfolio.",
        backgroundColor: "#814A0E"
    },
    {
        id: "b",
        title: "What is Index Fund?",
        content: "Index Fund is like mutual fund or exchange traded fund, which is designed to follow certain preset rules so that it can replicate the performance of a specified ASSET basket of underlying investment.",
        backgroundColor: "#959684"
    },
    {
        id: "c",
        title: "Why do you need Crypto INDEX?",
        content: "Crypto Index provides a portfolio of less risky and market winning crypto assets. We provide expert insights and a user friendly platform that simplifies investment process.",
        backgroundColor: "#5DBCD2"
    }
]