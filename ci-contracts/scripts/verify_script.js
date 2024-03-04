const hre = require("hardhat");

async function main() {
  const accounts = await hre.ethers.getSigners();

  const owner = accounts[0];

  const ETH = "0xE98F36e22e4e13a123f325e1B52108765e133eAe";
  const BTC = "0xA49e29D2E987651b7C9476206EA423e7F058Ff65";
  const Controller = "0x346F7bDb9552BE08501248059f739F9542AEA37A";
  const BIM = "0xa9bF2f88990F3693a7c7fdE35DA1aA9dd309CDdd";
  const BLUE = "0x33d00051ABd6D46E710adeaa321985e8eba1960f";

  await run("verify:verify", {
    address: BLUE,
    constructorArguments: [
      [ETH, BTC],
      [3000000000000000000n, 1000000000000000000n],
      [BIM],
      Controller,
      owner.address,
      "Blue Chip",
      "BLUE",
    ],
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
