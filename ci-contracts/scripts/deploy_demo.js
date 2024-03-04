const hre = require("hardhat");

async function main() {
  //Setting Accounts
  const accounts = await hre.ethers.getSigners();
  const owner = accounts[0];
  console.log("Primary Account [owner]: ", owner.address);


  //Deploy Token Contracts
  const wBTC = await hre.ethers.deployContract("ERCToken", [
    "Wrapped Bitcoin",
    "wBTC",
  ])
  const wETH = await hre.ethers.deployContract("ERCToken", [
    "Wrapped Ethereum",
    "wETH",
  ]);
  const USDT = await hre.ethers.deployContract("ERCToken", [
    "USD Tether",
    "USDT",
  ]);
  await USDT.waitForDeployment();

  //verify Token contracts
  // const verifywBTC = await run("verify:verify", {
  //   address: wBTC.target,
  //   constructorArguments: [
  //     "Wrapped Bitcoin",
  //     "wBTC",
  //   ],
  // })
  // const verifywETH = await run("verify:verify", {
  //   address: wETH.target,
  //   constructorArguments: [
  //     "Wrapped Ethereum",
  //     "wETH",
  //   ],
  // })
  // const verifyUSDT = await run("verify:verify", {
  //   address: USDT.target,
  //   constructorArguments: [
  //     "USD Tether",
  //     "USDT",
  //   ],
  // })



  // Mint 5 wBTC, 100 wETH and 40,000 USDT for 3 accounts
  for (let index = 0; index < 3; index++) {
    await wBTC
      .connect(accounts[index])
      .mint(accounts[index], 5000000000000000000n);
      // 5 wBTC
    await wETH
      .connect(accounts[index])
      .mint(accounts[index], 100000000000000000000n);
      // 20 wETH
    const mintTrx = await USDT.connect(accounts[index]).mint(accounts[index], 40000000000000000000000n );
    await mintTrx.wait(3)  
  }

  const BTCSupply = await wBTC.totalSupply();
  const ETHSupply = await wETH.totalSupply();
  const USDTSuply = await USDT.totalSupply()

  console.log(
    "BTC Contract: ", 
    String(wBTC.target),
    " BTC Supply: ",
    String(BTCSupply) / 10 ** 18,
    "ETH Contract: ", 
    String(wETH.target),
    "ETH Supply: ",
    String(ETHSupply) / 10 ** 18,
    " USDT Contract: ",
    String(USDT.target),
    " USDT Supply: ",
    String(USDTSuply) / 10 ** 18
  );

  // Deploy Controller
  const controller = await ethers.deployContract("Controller", [owner]);
  await controller.waitForDeployment()
  console.log("Controller Contract:", controller.target);
  
  //Verify Controller
  // const verifyController = await run("verify:verify", {
  //   address: controller.target,
  //   constructorArguments: [owner],
  // })

  // Deploy BIM Module
  const basicIssueModule = await ethers.deployContract("BasicIssuanceModule", [
    controller.target,
  ]);
  await basicIssueModule.waitForDeployment()
  console.log("Basic Issue Module Contract:", basicIssueModule.target);

  //Verify BIM Module 
  // const verifyBIM = await run("verify:verify", {
  //   address: basicIssueModule.target,
  //   constructorArguments: [controller.target]
  // })


  // initialize controller
  const initTx = await controller.initialize([owner], [basicIssueModule.target], [], []);
  const initReciept = await initTx.wait(3)
  // console.log("Controller INIT Log: ", initReciept)
  

  // Deploy Set Token (Crypto INDEX - wBTC, wETH, USDT)
  //1BTC, 20ETH, 8000USDT
  const cryptoINDEX = await ethers.deployContract("SetToken", [
    [wBTC.target, wETH.target, USDT.target],
    [1000000000000000000n, 20000000000000000000n, 8000000000000000000000n ], 
    [basicIssueModule.target],
    controller.target,
    owner,
    "Crypto Index",
    "INDEX",
  ]);
  await cryptoINDEX.waitForDeployment();
  console.log("Crypto Index Token Contract:", cryptoINDEX.target);

  //Verify Crypto Index Contract
  // const verifyINDEX = await run("verify:verify", {
  //   address: cryptoINDEX.target,
  //   constructorArguments: [
  //     [wBTC.target, wETH.target, USDT.target],
  //     [1000000000000000000n, 20000000000000000000n, 8000000000000000000000n ], 
  //     [basicIssueModule.target],
  //     controller.target,
  //     owner,
  //     "Crypto Index",
  //     "INDEX",
  //   ]
  // })
  // await verifyINDEX.wait(3);
  // console.log("INDEX token contract verification result: ", verifyINDEX)

  // Add Set to Controller Contract
  const setConnectTx = await controller.connect(owner).addSet(cryptoINDEX.target);
  const setConnectReceipt = await setConnectTx.wait(3);
  // console.log("Set Connect To Controller :", setConnectReceipt)

  // Initialize BIM Module
  const bimInitTrx = await basicIssueModule
    .connect(owner)
    .initialize(cryptoINDEX.target, "0x0000000000000000000000000000000000000000");

  const bimInitReceipt = await bimInitTrx.wait(3);
  // console.log("BIM INIT Transaction: ", bimInitReceipt)  

  // Delegate wETH/wBTC/USDT allowance to BIM
  for (let index = 0; index < 3; index++) {
    const wbtcApproveTx =  await wBTC
      .connect(accounts[index])
      .approve(basicIssueModule.target, 4000000000000000000n); //Approve 4 wBTC
    await wbtcApproveTx.wait(3)

    const wethApproveTx = await wETH
      .connect(accounts[index])
      .approve(basicIssueModule.target, 80000000000000000000n); //Approve 8 wETH
    await wethApproveTx.wait(3)  
    
    const USDTApproveTx =  await USDT
      .connect(accounts[index])
      .approve(basicIssueModule.target, 20000000000000000000000n); //Approve 20000 USDT
    await USDTApproveTx.wait(3)
  }
  

  // Testing Components and Units in Set Token
  //Testing for 1 INDEX TOKEN
  const result = await basicIssueModule.getRequiredComponentUnitsForIssue(
    cryptoINDEX.target,
    1000000000000000000n
  );

  // components required to mint INDEX Tokens
  console.log("AMOUNT OF COMPONENTS REQUIRED TO MINT 1 INDEX TOKEN: ", result);
  const components = await cryptoINDEX.getComponents();
  console.log("DEFAULT COMPONENT POSITION");
  for (const component of components) {
    const defaultPos = await cryptoINDEX.getDefaultPositionRealUnit(component);
    const realUnit = await cryptoINDEX.getTotalComponentRealUnits(component);
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
  const posMultiplier = await cryptoINDEX.positionMultiplier();
  console.log("POSITION MULTIPLIER: ", posMultiplier);

  // Positions
  const positions = await cryptoINDEX.getPositions();
  console.log("POSITIONS: ", positions);

  // Issue Crypto INDEX  tokens
  const tokenSupply = await cryptoINDEX.totalSupply();
  // Mint 1.239 INDEX Tokens
  console.log("Token Supply:", tokenSupply);
  await basicIssueModule
    .connect(accounts[0])
    .issue(cryptoINDEX.target, 1239000000000000000n, owner.address);
  // Mint 2.423 INDEX Tokens
  await basicIssueModule
    .connect(accounts[1])
    .issue(cryptoINDEX.target, 2423000000000000000n, accounts[1].address);
  // Miint 3.987 INDEX Tokens
  const issueAccount3 = await basicIssueModule
    .connect(accounts[2])
    .issue(cryptoINDEX.target, 1987000000000000000n, accounts[2].address);
  await issueAccount3.wait(3)  


  // Check Updated token supply
  const newTokenSupply = await cryptoINDEX.totalSupply();
  console.log("New Updated Token Supply:", String(newTokenSupply) / 10 ** 18);

  // Print Account Balances
  for (index = 0 ; index < 3 ; index++ ) {
    const balance = await hre.ethers.provider.getBalance(accounts[index]);
    const balancewBTC = await wBTC.balanceOf(accounts[index].address);
    const balancewETH = await wETH.balanceOf(accounts[index].address);
    const balanceUSDT = await USDT.balanceOf(accounts[index].address);
    const balanceINDEX = await cryptoINDEX.balanceOf(accounts[index].address);
    console.log(
      accounts[index].address,
      " ETH: ",
      String(balance) / 10 ** 18,
      
      " WBTC: ",
      String(balancewBTC) / 10 ** 18,
      " WETH: ",
      String(balancewETH) / 10 ** 18,
      " USDT: ",
      String(balanceUSDT) / 10 ** 18,
      " INDEX: ",
      String(balanceINDEX) / 10 ** 18
    );
  }

  // Check INDEX Token Contract Balance
  const INDEXwBTCbalance = await wBTC.balanceOf(cryptoINDEX.target);
  const INDEXwETHbalance = await wETH.balanceOf(cryptoINDEX.target);
  const INDEXUSDTbalance = await USDT.balanceOf(cryptoINDEX.target)
  console.log(
    "INDEX Balance| wBTC:",
    String(INDEXwBTCbalance) / 10 ** 18,
    " wETH: ",
    String(INDEXwETHbalance) / 10 ** 18,
    " USDT: ",
    String(INDEXUSDTbalance) / 10 ** 18 
  );

  //REDEEM INDEX TOKENS
  await basicIssueModule
    .connect(accounts[2])
    .redeem(cryptoINDEX.target, 1387000000000000000n, accounts[2].address);



     // Print Account Balances
  for (index = 0 ; index < 3 ; index++ ) {
    const balance = await hre.ethers.provider.getBalance(accounts[index]);
    const balancewBTC = await wBTC.balanceOf(accounts[index]);
    const balancewETH = await wETH.balanceOf(accounts[index]);
    const balanceUSDT = await USDT.balanceOf(accounts[index]);
    
    const balanceINDEX = await cryptoINDEX.balanceOf(accounts[index]);
    console.log(
      accounts[index].address,
      " ETH: ",
      String(balance) / 10 ** 18,
      
      " WBTC: ",
      String(balancewBTC) / 10 ** 18,
      " WETH: ",
      String(balancewETH) / 10 ** 18,
      " USDT: ",
      String(balanceUSDT) / 10 ** 18,
      " INDEX: ",
      String(balanceINDEX) / 10 ** 18
    );
  }



}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
