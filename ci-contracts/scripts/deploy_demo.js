const hre = require("hardhat");

async function main() {
  //Setting Accounts
  const accounts = await hre.ethers.getSigners();

  //   for (const account of accounts) {
  //     const balance = await hre.ethers.provider.getBalance(account);
  //     console.log(account.address, " ", balance);
  //   }

  const owner = accounts[0];
  console.log("Primary Account [owner]: ", owner.address);

  //Deploy Token Contracts
  const wETH = await hre.ethers.deployContract("ERCToken", [
    "Wrapped Ethereum",
    "wETH",
  ]);
  const wBTC = await hre.ethers.deployContract("ERCToken", [
    "Wrapped Bitcoin",
    "wBTC",
  ]);

  // Mint 100 wETH and 50 wBTC for 3 accounts
  for (let index = 0; index < 3; index++) {
    await wETH
      .connect(accounts[index])
      .mint(accounts[index], 20000000000000000000n);
      // 20 wETH
    await wBTC
      .connect(accounts[index])
      .mint(accounts[index], 5000000000000000000n);
      // 5 wBTC
  }

  const ETHSupply = await wETH.totalSupply();
  const BTCSupply = await wBTC.totalSupply();

  console.log(
    "ETH Contract: ", 
    String(wETH.target),
    "ETH Supply: ",
    String(ETHSupply) / 10 ** 18,
    "BTC Contract: ", 
    String(wBTC.target),
    " BTC Supply: ",
    String(BTCSupply) / 10 ** 18
  );

  // Deploy Controller
  const controller = await ethers.deployContract("Controller", [owner]);
  console.log("Controller Contract:", controller.target);

  // Deploy BIM Module
  const basicIssueModule = await ethers.deployContract("BasicIssuanceModule", [
    controller.target,
  ]);
  console.log("Basic Issue Module Contract:", basicIssueModule.target);

  // initialize controller
  const initTx = await controller.initialize([owner], [basicIssueModule.target], [], []);
  const initReciept = await initTx.wait()
  console.log("Controller INIT Log: ", initReciept)
  

  // Deploy Set Token (Blue Chip - wETH, wBTC)
  const blueChip = await ethers.deployContract("SetToken", [
    [wETH.target, wBTC.target],
    [3000000000000000000n, 1000000000000000000n],
    [basicIssueModule.target],
    controller.target,
    owner,
    "Blue Chip",
    "BLUE",
  ]);
  console.log("Blue Chip Token Contract:", blueChip.target);

  // Add Set to Controller Contract
  const setConnectTx = await controller.connect(owner).addSet(blueChip.target);
  const setConnectReceipt = await setConnectTx.wait();
  console.log("Set Connect To Controller :", setConnectReceipt)

  // Initialize BIM Module
  await basicIssueModule
    .connect(owner)
    .initialize(blueChip.target, "0x0000000000000000000000000000000000000000");

  // Delegate wETH/wBTC allowance to BIM
  for (let index = 0; index < 3; index++) {
    await wETH
      .connect(accounts[index])
      .approve(basicIssueModule.target, 20000000000000000000n);
    await wBTC
      .connect(accounts[index])
      .approve(basicIssueModule.target, 5000000000000000000n);
  }
  

  // Testing Components and Units in Set Token
  //Testing for 1 BLUE TOKEN
  const result = await basicIssueModule.getRequiredComponentUnitsForIssue(
    blueChip.target,
    1000000000000000000n
  );

  // components required to mint Blue Tokens
  console.log("AMOUNT OF COMPONENTS REQUIRED TO MINT 1 BLUE TOKEN: ", result);
  const components = await blueChip.getComponents();
  console.log("DEFAULT COMPONENT POSITION");
  for (const component of components) {
    const defaultPos = await blueChip.getDefaultPositionRealUnit(component);
    const realUnit = await blueChip.getTotalComponentRealUnits(component);
    console.log(
      "component: ",
      component,
      " Default position: ",
      defaultPos,
      " total comp real unit: ",
      realUnit
    );
  }

  // Position Multiplier
  const posMultiplier = await blueChip.positionMultiplier();
  console.log("POSITION MULTIPLIER: ", posMultiplier);

  // Positions
  const positions = await blueChip.getPositions();
  console.log("POSITIONS: ", positions);

  // Issue BLUE CHIP tokens
  const tokenSupply = await blueChip.totalSupply();
  // Mint 1.239 Blue Tokens
  console.log("Token Supply:", tokenSupply);
  await basicIssueModule
    .connect(accounts[0])
    .issue(blueChip.target, 1239000000000000000n, owner.address);
  // Mint 2.423 Blue Tokens
  await basicIssueModule
    .connect(accounts[1])
    .issue(blueChip.target, 2423000000000000000n, accounts[1].address);
  // Miint 3.987 Blue Tokens
  await basicIssueModule
    .connect(accounts[2])
    .issue(blueChip.target, 3987000000000000000n, accounts[2].address);

  // Check Updated token supply
  const newTokenSupply = await blueChip.totalSupply();
  console.log("New Updated Token Supply:", String(newTokenSupply) / 10 ** 18);

  // Print Account Balances
  for (index = 0 ; index < 3 ; index++ ) {
    const balance = await hre.ethers.provider.getBalance(accounts[index]);
    const balancewETH = await wETH.balanceOf(accounts[index]);
    const balancewBTC = await wBTC.balanceOf(accounts[index]);
    const balanceBLUE = await blueChip.balanceOf(accounts[index]);
    console.log(
      accounts[index].address,
      " ETH: ",
      String(balance) / 10 ** 18,
      " WETH: ",
      String(balancewETH) / 10 ** 18,
      " WBTC: ",
      String(balancewBTC) / 10 ** 18,
      " BLUE: ",
      String(balanceBLUE) / 10 ** 18
    );
  }

  // Check BLUE Token Contract Balance
  const BLUEwBTCbalance = await wBTC.balanceOf(blueChip.target);
  const BLUEwETHbalance = await wETH.balanceOf(blueChip.target);
  console.log(
    "BLUE Balance| wBTC:",
    String(BLUEwBTCbalance) / 10 ** 18,
    " wETH: ",
    String(BLUEwETHbalance) / 10 ** 18
  );

  await basicIssueModule
    .connect(accounts[2])
    .redeem(blueChip.target, 1387000000000000000n, accounts[2].address);



     // Print Account Balances
  for (index = 0 ; index < 3 ; index++ ) {
    const balance = await hre.ethers.provider.getBalance(accounts[index]);
    const balancewETH = await wETH.balanceOf(accounts[index]);
    const balancewBTC = await wBTC.balanceOf(accounts[index]);
    const balanceBLUE = await blueChip.balanceOf(accounts[index]);
    console.log(
      accounts[index].address,
      " ETH: ",
      String(balance) / 10 ** 18,
      " WETH: ",
      String(balancewETH) / 10 ** 18,
      " WBTC: ",
      String(balancewBTC) / 10 ** 18,
      " BLUE: ",
      String(balanceBLUE) / 10 ** 18
    );
  }



}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
