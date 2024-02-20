import React from "react";
import "./App.css";

import { Route, Routes } from "react-router-dom";
import { useNetwork } from "wagmi";

import Header from "./components/Header";
import Home from "./pages/Home";
import BlueChip from "./pages/BlueChip";
import Faucet from "./pages/Faucet";
import Footer from "./components/Footer";

function App() {
  const { chain } = useNetwork();
  console.log("chain:", chain);

  return (
    <div className="App">
      <Header />

      <div className="body">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bluechip" element={<BlueChip />} />
          <Route path="/faucet" element={<Faucet />} />
        </Routes>
      </div>

      <Footer/>
      
    </div>
  );
}

export default App;
