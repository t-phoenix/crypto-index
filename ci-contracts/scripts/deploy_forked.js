// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.


// PHASE 1
// REQUIRE FORKING TO ACCESS OTHER PROTOCOLS
// IMPERSONATE HIGH NETWORTH WALLETS
// SETTING OWNER AS ACCOUNT[0]
// GET USDT/ WETH/ WBTC CONTRACTS
// PRINT BALANCES OF ALL ACCOUNTS

// PHASE 2
// DEPLOY CONTROLLER
// DEPLOY BIM MODULE
// INIT CONTROLLER
// DEPLOY BLUE CHIP SET TOKEN
// ADD BLUE CHIP SET TO CONTROLLER
// INIT BIM
// DELEGATE USDT/ WETH/ WBTC TO BIM
// TESTING UNITS AND COMPONENTS


// PHASE 3
// ISSUE BLUE CHIP SET TOKEN
// ISSUE BLUE CHIP SET TOKEN FOR OTHER ACCOUNTS
// CHECK UPDATED BALANCES
// CHECK BLUE CHIP SET TOKEN CONTRACT BALANCE


// PHASE 4
// DEPLOY NAV ISSUE MODULE
// 






const hre = require("hardhat");
// const v3InterfaceABI = require('./v3InterfaceABI');

const aggregatorV3InterfaceABI = [
  {
    inputs: [],
    name: "decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "description",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint80", name: "_roundId", type: "uint80" }],
    name: "getRoundData",
    outputs: [
      { internalType: "uint80", name: "roundId", type: "uint80" },
      { internalType: "int256", name: "answer", type: "int256" },
      { internalType: "uint256", name: "startedAt", type: "uint256" },
      { internalType: "uint256", name: "updatedAt", type: "uint256" },
      { internalType: "uint80", name: "answeredInRound", type: "uint80" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "latestRoundData",
    outputs: [
      { internalType: "uint80", name: "roundId", type: "uint80" },
      { internalType: "int256", name: "answer", type: "int256" },
      { internalType: "uint256", name: "startedAt", type: "uint256" },
      { internalType: "uint256", name: "updatedAt", type: "uint256" },
      { internalType: "uint80", name: "answeredInRound", type: "uint80" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "version",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
]


async function main() {
  //----------------------------------------------//
  // PHASE 1
  //----------------------------------------------//
  // mint 1 million wETH/ wBTC 
  const INITIAL_SUPPLY = 1000000;

  // Impoersonate high networth wallets
  let accounts = [];
  accounts[0] = await ethers.getImpersonatedSigner("0x0AFF6665bB45bF349489B20E225A6c5D78E2280F");
  accounts[1] = await ethers.getImpersonatedSigner("0x1680eD6A1fE73c673E778705355212235DeC3242");
  accounts[2] = await ethers.getImpersonatedSigner("0x4e287E1271630757424E06192943eD19DF553B41");
  
  // setting owner
  const owner = accounts[0];
  console.log("OWNER ADDRESS: ", owner.address)

  // Polygon Mainnet
  // USDT - 0xc2132D05D31c914a87C6611C10748AEb04B58e8F
  // wETH - 0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619
  // wBTC - 0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6

  // Get USDT/ wETH/ wBTC contracts by Address
  const USDT = await hre.ethers.getContractAt('ERC20', '0xc2132D05D31c914a87C6611C10748AEb04B58e8F');
  const wETH = await hre.ethers.getContractAt('ERC20', '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619');
  const wBTC = await hre.ethers.getContractAt('ERC20', '0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6');
  // console.log("Token Contracts:", USDT, wETH, wBTC);
  const USDT_ADDRESS = USDT.target;
  const wETH_ADDRESS = wETH.target;
  const wBTC_ADDRESS = wBTC.target;
  console.log("USDT Address:", USDT_ADDRESS);
  console.log("wETH Address:", wETH_ADDRESS); 
  console.log("wBTC Address:", wBTC_ADDRESS);



  // Print balances for every account corresponding to tokens
  for (const account of accounts) {
    const balance = await hre.ethers.provider.getBalance(account);
    const balanceUSDT = await USDT.balanceOf(account);
    const balancewETH = await wETH.balanceOf(account);
    const balancewBTC = await wBTC.balanceOf(account);
    console.log(account.address, ' MATIC: ',  String(balance)/10**18,' WETH: ', String(balancewETH)/10**18, ' WBTC: ', String(balancewBTC)/10**8);
  }
  

  //----------------------------------------------//
  // PHASE 2
  //----------------------------------------------//

  // Deploy Controller
  const controller = await ethers.deployContract("Controller", [owner]);
  console.log("Controller Contract:", controller.target)


  // Deploy BIM Module
  const basicIssueModule = await ethers.deployContract("BasicIssuanceModule", [controller.target]);  
  console.log("Basic Issue Module Contract:", basicIssueModule.target)  
  
  // initialize controller
  await controller.initialize([owner], [basicIssueModule.target], [], [] );

  // Deploy Set Token (Blue Chip - wETH, wBTC)
  const blueChip = await ethers.deployContract("SetToken", [[wETH_ADDRESS, wBTC_ADDRESS], [5000000000000000000n, 200000000n], [basicIssueModule.target], controller.target ,owner, "BLUE CHIP", "BLUE"]);
  console.log("Blue Chip Token Contract:", blueChip.target)


  // Add Set to Controller Contract
  await controller.connect(owner).addSet(blueChip.target);

  // Initialize BIM Module
  await basicIssueModule.connect(owner).initialize(blueChip.target, '0x0000000000000000000000000000000000000000');


  // Delegate wETH/wBTC allowance to BIM
  for (let index = 0; index < accounts.length; index++) {
    await wETH.connect(accounts[index]).approve(basicIssueModule.target, 200000000000000000000n);
    await wBTC.connect(accounts[index]).approve(basicIssueModule.target, 900000000n); 
  }

  // Testing Components and Units in Set Token
  const result = await basicIssueModule.getRequiredComponentUnitsForIssue(blueChip.target, 1000000000000000000n);
  console.log("AMOUNT OF COMPONENTS REQUIRED TO MINT 1 BLUE TOKEN: ", result)
  const components = await blueChip.getComponents();
  console.log("DEFAULT COMPONENT POSITION")
  for(const component of components){
    const defaultPos = await blueChip.getDefaultPositionRealUnit(component);
    const realUnit = await blueChip.getTotalComponentRealUnits(component);
    console.log("component: ", component, " Default position: ", defaultPos, " total comp real unit: ", realUnit); 
  }

  const posMultiplier = await blueChip.positionMultiplier();
  console.log("POSITION MULTIPLIER: ", posMultiplier);

  const positions = await blueChip.getPositions();
  console.log("POSITIONS: ", positions);


  //----------------------------------------------//
  // PHASE 3
  //----------------------------------------------//


  // Issue BLUE CHIP tokens
  const tokenSupply = await blueChip.totalSupply();
  console.log('Token Supply:', tokenSupply);
  await basicIssueModule.connect(accounts[0]).issue(blueChip.target, 1239000000000000000n, owner.address)


  // Issue BLUE CHIP for other accounts
  await basicIssueModule.connect(accounts[1]).issue(blueChip.target, 2423000000000000000n, accounts[1].address);
  await basicIssueModule.connect(accounts[2]).issue(blueChip.target, 3987000000000000000n, accounts[2].address);

  // Check Updated token supply
  const newTokenSupply = await blueChip.totalSupply();
  console.log("New Updated Token Supply:", String(newTokenSupply)/10**18);

  
  // Print Account Balances
  for (const account of accounts) {
    const balance = await hre.ethers.provider.getBalance(account);
    const balancewETH = await wETH.balanceOf(account);
    const balancewBTC = await wBTC.balanceOf(account);
    const balanceBLUE = await blueChip.balanceOf(account);
    console.log(account.address, ' MATIC: ',  String(balance)/10**18, ' WETH: ', String(balancewETH)/10**18, ' WBTC: ', String(balancewBTC)/10**8, ' BLUE: ', String(balanceBLUE)/10**8);
  
  }

  // Check BLUE Token Contract Balance
  const BLUEwBTCbalance = await wBTC.balanceOf(blueChip.target);
  const BLUEwETHbalance =  await wETH.balanceOf(blueChip.target);
  console.log("BLUE Balance| wBTC:", String(BLUEwBTCbalance)/10**8, ' wETH: ', String(BLUEwETHbalance)/10**18);


  //----------------------------------------------//
  // PHASE 4
  //----------------------------------------------//
  // Controller
  // masterQuoteAsset - address of asset that can be used to link unrelated asset prices
  // Adapters - used to price assets created by other protocols
  // assetOnes - list of first asset in pair
  // assetTwos - list of second asset in pair
  // Oracles - list of oracles
  
  // BTC/USD - 0xc907E116054Ad103354f2D350FD2514433D57F6f
  // ETH/USD - 0xF9680D99D6C9589e2a93a78A04A279e509205945
  // BTC/ETH - 0x19b0F0833C78c0848109E3842D34d2fDF2cA69BA

  // USDT/ ETH - 0xf9d5AAC6E5572AEFa6bd64108ff86a222F69B64d
  // USDT/ USD - 0x0A6513e40db6EB1b165753AD52E80663aeA50545


  const v3Contract = await hre.ethers.getContractAt(aggregatorV3InterfaceABI, '0xc907E116054Ad103354f2D350FD2514433D57F6f');
  console.log("V3 Contract: ", v3Contract);
  const btcusdPrice = await v3Contract.latestRoundData();
  console.log("BTC USD Price: ", btcusdPrice)




  const priceOracle = await ethers.deployContract("PriceOracle", [controller.target, USDT_ADDRESS, [], [wBTC_ADDRESS, wETH_ADDRESS], [USDT_ADDRESS, USDT_ADDRESS],   ['0xc907E116054Ad103354f2D350FD2514433D57F6f', '0xF9680D99D6C9589e2a93a78A04A279e509205945'] ])
  console.log("Price Oracle: ", priceOracle.target);

  // must connect to controller for {controller.isSystemContract(msg.sender)}
  controller.addResource(priceOracle.target, 1);

  // const checkSystemContract = await controller.isSystemContract(accounts[0]);
  // console.log("Check if accounts[0] is system contract: ", checkSystemContract );


  const ethusdtprice = await priceOracle.connect(accounts[0]).getPrice(wETH_ADDRESS,USDT_ADDRESS);
  console.log("ETH/ USDT Price: ", String(ethusdtprice)/10**18 );

  const btcusdtprice = await priceOracle.connect(accounts[0]).getPrice(wBTC_ADDRESS, USDT_ADDRESS);
  console.log("BTC/ USDT Price: ", String(btcusdtprice)/10**18 );

  const ethbtcprice = await priceOracle.connect(accounts[0]).getPrice( wETH_ADDRESS, wBTC_ADDRESS);
  console.log("ETH / BTC Price: ", String(ethbtcprice)/10**18 )




}



// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});



//Core deployments:
//1. Deploy Controller(feeRecipient)

// 1.1 Prepare components - wBTC, wETH, LINK
// 1.2 Deploy Modules - BIM
//2. Deploy SetToken(components[], units[], modules[], controller, manager, name, symbol)


// NAV ISSUE MODULE
// SetValuer
// Oracle
// Integration Registry
// Trade Module
// Custom NAV ISSUE MODULE
// 2.1 address masterQuoteAsset
// 2.2 Adapters
// 2.3 Oracles
//3. Deploy Oracle(controller, masterQuoteAsset, adapters[], assetOnes[], AssetTwos[], oracles[])
//4. Deploy Integration Registry(controller)
//5. Deply SetValuer (controller)


// DEPLOYING WITH GENERAL INDEX MODULE
// 