import React from "react";
import "../styles/footer.css"
import { FaDiscord, FaFacebook, FaXTwitter, FaGithub  } from "react-icons/fa6";
import { MdCopyright } from "react-icons/md";

export default function Footer() {
  return (
    <div className="footer-box">
      <div className="footer-container">
           <FaDiscord size={32} style={{color: '#5865f2'}}/>
          <h1>Discord</h1>
      </div>
      
      <div className="footer-container">
          <FaXTwitter size={32} style={{color: '#e1e8ed'}} />
          <h1>Twitter</h1>
      </div>
      <div className="footer-container">
          <FaFacebook size={32} style={{color: '#1877f2'}}/>
          <h1>Facebook</h1>
      </div>
      <div className="footer-container">
          <FaGithub size={32}/>
          <h1>Github</h1>
      </div>
      <div className="footer-copyright">
        <p style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}><MdCopyright/> 2024 Crypto Basket. </p>
        <p>All rights reserved.</p>
      </div>
    </div>
  );
}
