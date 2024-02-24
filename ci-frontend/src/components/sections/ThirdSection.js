import React from "react";
import "./third.css";
import ShapeShift from "../designs/ShapeShift";
import {motion} from 'framer-motion';

export default function ThirdSection() {
  return (
    <div className="third-section-box">
      <ShapeShift />
      <motion.div className="card" 
        initial={{opacity: 0, translateX: -200}}
        whileInView={{opacity: 1, translateX: 0}}
        transition={{duration: 2}}
        >
        <h3 className="card-header">What is Index Fund?</h3>
        <p className="card-content">
          Index Fund is like mutual fund or exchange traded fund, which is
          designed to follow certain preset rules so that it can replicate the
          performance of a specified ASSET basket of underlying investment.
        </p>
      </motion.div>
    </div>
  );
}
