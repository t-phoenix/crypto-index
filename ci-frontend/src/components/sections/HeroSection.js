import { useState } from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import {
  HERO_HEADING_DURATION,
  HERO_HEADING_FINAL_OPACITY,
  HERO_HEADING_FINAL_SCALE,
  HERO_HEADING_INITIAL_OPACITY,
  HERO_HEADING_INITIAL_SCALE,
} from "../../constants/animation";
import "./hero.css";
import { MdNorthEast } from "react-icons/md";
import Icon from "react-crypto-icons";
import CiLogo from "../../assets/CiLogo.png"

export default function HeroSection() {
  const [typingAnimationTextColor, setTypingAnimationTextColor] = useState("");
  const [typingAnimationSize, setTypingAnimationSize] = useState("");


  const brands = ["btc","eth","usdt","bnb","sol","usdc","ada","avax","trx","doge","link","matic","etc","dai","uni","fil","stx","ldo","zil","1inch","aave","akt","atom","bal","busd","cake","comp","cosm","dodo","tfuel","grt","hbar","paxg","qtum","ray","sia","snx","storj","sushi","btc","eth","usdt","bnb","sol","usdc","ada","avax","trx","doge","link","matic","etc","dai","uni","fil","stx","ldo","zil","1inch","aave","akt","atom","bal","busd","cake","comp","cosm","dodo","tfuel","grt","hbar","paxg","qtum","ray","sia","snx","storj","sushi"];

  return (
    <div className="main-animation-div">
      {/* LANDING HEADING */}
      <motion.div
        animate={{
          scale: HERO_HEADING_FINAL_SCALE,
          opacity: HERO_HEADING_FINAL_OPACITY,
        }}
        initial={{
          scale: HERO_HEADING_INITIAL_SCALE,
          opacity: HERO_HEADING_INITIAL_OPACITY,
        }}
        transition={{ ease: "easeInOut", duration: HERO_HEADING_DURATION }}
        className="main-animation-box"
      >
        

        <h2 className="main-static-text"><img src={CiLogo} style={{height: '150px', marginRight: '-36px', marginBottom: '-18px'}} alt="logo"/>{`rypto Basket \u00A0`}</h2>
        <h2
          className="main-animation-text"
          style={{
            color: typingAnimationTextColor,
            fontSize: typingAnimationSize,
          }}
        >
          <TypeAnimation
            sequence={[
              () => setTypingAnimationTextColor("#C4A287"),
              "To Simplify",
              1000,
              () => setTypingAnimationTextColor("#B38CB4 "),
              "For Investors",
              1000,
              () => setTypingAnimationTextColor("#837A75"),
              "To Save",
              1000,
              () => setTypingAnimationTextColor("#758173"),
              "For Hodlers",
              1000,
              () => setTypingAnimationTextColor("#ff9b42 "),
              "To Diversify",
              1000,
              () => setTypingAnimationTextColor("#3A5743 "),
              "For Traders",
              1000,
            ]}
            speed={50}
            deletionSpeed={75}
            repeat={Infinity}
            wrapper="span"
            cursor
            preRenderFirstString={false}
            omitDeletionAnimation={false}
            className="inline-block"
          />
        </h2>
        <p className="main-animation-subtext">
          {" "}
          Crypto Index Fund is your gateway to simplified, diversified
          cryptocurrency investments. We come to your rescue, offering you a
          smarter and more accessible way to invest in the exciting world of
          cryptocurrencies.{" "}
        </p>
      </motion.div>

      {/* // ACTION BUTTON */}
      <div className="button-box">
        <button
          className="main-button-hero"
        >
          <p>Get Started{" "}</p>
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
        <button
          className="support-button-hero"
        >
          <p>View Products{" "}</p>
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

      {/* //BRAND CAROUSEL */}

      <div className="carousel-container">
        <motion.div
          className="carousel"
          animate={{
            x: ["0%", "50%"],
          }}
          transition={{
            duration: 120, // Adjust the duration to control speed
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop",
            repeatDelay: 0
          }}
        >
          {/* Duplicate the brand list for seamless looping */}
          {[...brands, ...brands].map((logo, index) => (
            <motion.div key={index} className="carousel-item" whileHover={{scale: 1.4}}>
              <Icon key={index} name={logo} size={50} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
