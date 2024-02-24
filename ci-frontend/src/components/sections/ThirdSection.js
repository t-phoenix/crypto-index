import React from "react";
import "./third.css";
import ShapeShift from "../designs/ShapeShift";

export default function ThirdSection() {
  return (
    <div className="third-section-box">
      <ShapeShift />
      <div className="card">
        <h3 className="card-header">What is Index Fund?</h3>
        <p className="card-content">
          Index Fund is like mutual fund or exchange traded fund, which is
          designed to follow certain preset rules so that it can replicate the
          performance of a specified ASSET basket of underlying investment.
        </p>
      </div>
    </div>
  );
}
