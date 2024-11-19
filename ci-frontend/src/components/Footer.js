import React from "react";
import "../styles/footer.css"

export default function Footer() {
  return (
    <div className="footer-box">
      <p style={{ color: "#52BAD1", marginBlock: "2vh" }}>
        Made with ❤️ by{" "}
        <a
          href={`https://twitter.com/touchey_phoenix`}
          target="blank"
          style={{ fontSize: "14px" }}
        >
          @toucheyphoenix
        </a>
      </p>
    </div>
  );
}
