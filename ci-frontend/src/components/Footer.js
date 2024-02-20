import React from "react";

export default function Footer() {
  return (
    <div>
      <p style={{ color: "#52BAD1", marginBlock: "30vh" }}>
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
