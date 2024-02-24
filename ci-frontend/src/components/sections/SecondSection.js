import React from "react";
import "./second.css";
import BoxDesign from "../designs/BoxDesign";
import {motion} from 'framer-motion';

export default function SecondSection() {
  return (
    <div className="second-section-box">
      <motion.div 
        className="card" 
        initial={{opacity: 0, translateX: -200}}
        whileInView={{opacity: 1, translateX: 0}}
        transition={{duration: 2, ease: 'easeInOut'}}
        >
        <h3 className="card-header">What is Crypto Index?</h3>
        <p className="card-content">
          In simple words, its a cryptocurrency index fund which helps you
          invest in cryptocurreny with a safe and diversified portfolio.
        </p>
      </motion.div>
      <BoxDesign />
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