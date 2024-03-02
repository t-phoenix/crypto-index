// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  // mint 1 million wETH/ wBTC 
  const INITIAL_SUPPLY = 1000000;

  // Impoersonate hogh networth wallets
  let accounts = [];
  accounts[0] = await ethers.getImpersonatedSigner("0x0AFF6665bB45bF349489B20E225A6c5D78E2280F");
  accounts[1] = await ethers.getImpersonatedSigner("0x52D7e382fAEB0E792CE32b43e81920F2Bf788502");
  accounts[2] = await ethers.getImpersonatedSigner("0x21Cb017B40abE17B6DFb9Ba64A3Ab0f24A7e60EA");
  
  // setting owner
  const owner = accounts[0];
  console.log("OWNER ADDRESS: ", owner)

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
    console.log(account.address, ' MATIC: ',  String(balance)/10**18, ' WETH: ', String(balancewETH)/10**18, ' WBTC: ', String(balancewBTC)/10**8, ' BLUE: ', String(balanceBLUE));
  
  }

  // Check BLUE Token Contract Balance
  const BLUEwBTCbalance = await wBTC.balanceOf(blueChip.target);
  const BLUEwETHbalance =  await wETH.balanceOf(blueChip.target);
  console.log("BLUE Balance| wBTC:", String(BLUEwBTCbalance)/10**8, ' wETH: ', String(BLUEwETHbalance)/10**18);



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
// 1.2 Deploy Modules - BIM, 
//2. Deploy SetToken(components[], units[], modules[], controller, manager, name, symbol)

// 2.1 address masterQuoteAsset
// 2.2 Adapters
// 2.3 Oracles
//3. Deploy Oracle(controller, masterQuoteAsset, adapters[], assetOnes[], AssetTwos[], oracles[])
//4. Deploy Integration Registry(controller)
//5. Deply SetValuer (controller)