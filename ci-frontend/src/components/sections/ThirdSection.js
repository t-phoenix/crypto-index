import React from "react";
import "./third.css";
import ShapeShift from "../designs/ShapeShift";
import { motion } from "framer-motion";
import {
  MdAccountBalance,
  MdDeveloperBoard,
  MdFlag,
  MdNorthEast,
  MdUpdate,
} from "react-icons/md";
import BoxDesign from "../designs/BoxDesign";

export default function ThirdSection() {
  return (
    <div className="third-section-box">
        <BoxDesign />
      <motion.div
        className="card"
        initial={{ opacity: 0, translateX: -200 }}
        whileInView={{ opacity: 1, translateX: 0 }}
        transition={{ duration: 2 }}
      >
        <h3 className="card-header">What's Different In Our Process?</h3>
        <p className="card-content">
          Index Fund is like mutual fund or exchange traded fund, which is
          designed to follow certain preset rules so that it can replicate the
          performance of a specified ASSET basket of underlying investment.
        </p>
        <div className="third-info-grid">
          <motion.div className="third-info-grid-box" whileHover={{scale:1.05}}>
            <MdFlag size={40} className="third-icon-style" />
            <h1>Discovery</h1>
            <p className="card-content">
              Analyse Winning Digital Assets and discuss potential fund
              inclusions
            </p>
          </motion.div>
          <motion.div className="third-info-grid-box" whileHover={{scale:1.05}}>
            <MdDeveloperBoard size={40} className="third-icon-style" />
            <h1>Strategy</h1>
            <p className="card-content">
              Periodic planning and strategising to update the fund portfolio
            </p>
          </motion.div>
          <motion.div className="third-info-grid-box" whileHover={{scale:1.05}}>
            <MdUpdate size={40} className="third-icon-style" />
            <h1>Rebalancing</h1>
            <p className="card-content">
              Fund will be rebalanced in real time to minimise extractable
              value.
            </p>
          </motion.div>
          <motion.div className="third-info-grid-box" whileHover={{scale:1.05}}>
            <MdAccountBalance size={40} className="third-icon-style" />
            <h1>Indexes</h1>
            <p className="card-content">
              Structured products for every trader and for every investor
            </p>
          </motion.div>
        </div>

        <div className="end-button-box">
          <button className="main-button">
            Products{" "}
            <MdNorthEast
              size={30}
              style={{
                backgroundColor: "#000",
                color: "#a5e65a",
                padding: "4px",
                borderRadius: "25px",
                marginLeft: "0%",
              }}
            />
          </button>
          <button className="support-button">
            Contact Us{" "}
            <MdNorthEast
              size={32}
              style={{
                backgroundColor: "#000",
                color: "#a5e65a",
                padding: "4px",
                borderRadius: "25px",
                marginLeft: "0%",
              }}
            />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
