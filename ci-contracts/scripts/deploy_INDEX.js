const hre = require("hardhat");

async function main() {
  const accounts = await hre.ethers.getSigners();

  const owner = accounts[0];

  const ETH = "0xE98F36e22e4e13a123f325e1B52108765e133eAe";
  const BTC = "0xA49e29D2E987651b7C9476206EA423e7F058Ff65";
  const Controller = "0x346F7bDb9552BE08501248059f739F9542AEA37A";
  const BIM = "0xa9bF2f88990F3693a7c7fdE35DA1aA9dd309CDdd";

  const USDT = await hre.ethers.deployContract("ERCToken", [
    "USD Tether",
    "USDT",
  ]);

  for (let index = 0; index < 3; index++) {
    const mintTx = await USDT
      .connect(accounts[index])
      .mint(accounts[index], 5000000000000000000000n);
      // 5000 USDT
    await mintTx.wait(2); 
  }

  const USDTSupply = await USDT.totalSupply();

  const verifyUSDT = await run("verify:verify", {
    address: USDT.target,
    constructorArguments: [
        "USD Tether",
        "USDT",
    ],
  })
  const verifyUSDTReceipt = await verifyUSDT.wait(2);


  const CryptoINDEX = await ethers.deployContract("SetToken", [
    [BTC, ETH, USDT.target],
    [1000000000000000000n, 20000000000000000000n, 8000000000000000000000n ], //1BTC, 20ETH, 8000USDT
    [BIM],
    Controller,
    owner,
    "Crypto Index",
    "INDEX",
  ]);
  await CryptoINDEX.wait(2);
  console.log("Crypto Index Token Contract:", CryptoINDEX.target);


  


}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
