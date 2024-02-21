import React from "react";

export default function Footer() {
  return (
    <div style={{width: '100%'}}>
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
