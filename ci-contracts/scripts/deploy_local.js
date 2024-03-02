// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const INITIAL_SUPPLY = 1000000;
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    const balance = await hre.ethers.provider.getBalance(account);
    console.log(account.address, ' ', balance);
  }

  const owner = accounts[0];


  const wETH = await hre.ethers.deployContract("ERCToken", ["Wrapped Ethereum", "wETH", INITIAL_SUPPLY ])
  const wBTC = await hre.ethers.deployContract("ERCToken", ["Wrapped Bitcoin", "wBTC", INITIAL_SUPPLY])
  const wETH_ADDRESS = wETH.target;
  const wBTC_ADDRESS = wBTC.target;
  console.log("wETH Address:", wETH_ADDRESS) 
  console.log("wBTC Address:", wBTC_ADDRESS);


  //Transfer tokens
  await wETH.transfer(accounts[1], 300000);
  await wBTC.transfer(accounts[1], 250000);
  await wETH.transfer(accounts[2], 200000);
  await wBTC.transfer(accounts[2], 150000);


  // Deploy Controller
  const controller = await ethers.deployContract("Controller", [owner]);
  console.log("Controller Contract:", controller.target)


  // Deploy BIM Module
  const basicIssueModule = await ethers.deployContract("BasicIssuanceModule", [controller.target]);  
  console.log("Basic Issue Module Contract:", basicIssueModule.target)  
  
  // initialize controller
  await controller.initialize([owner], [basicIssueModule.target], [], [] );

  // Deploy Set Token (Blue Chip - wETH, wBTC)
  const blueChip = await ethers.deployContract("SetToken", [[wETH_ADDRESS, wBTC_ADDRESS], [1000000000000000000n, 7000000000000000000n], [basicIssueModule.target], controller.target ,owner, "BLUE CHIP", "BLUE"]);
  console.log("Blue Chip Token Contract:", blueChip.target)

  // Add Set to Controller Contract
  await controller.addSet(blueChip.target);

  //Initialize BIM Module
  await basicIssueModule.initialize(blueChip.target ,'0x0000000000000000000000000000000000000000');


  //Delegate wETH/wBTC allowance to contract
  await wETH.approve(basicIssueModule.target, 400000);
  await wBTC.approve(basicIssueModule.target, 300000);
  await wETH.connect(accounts[1]).approve(basicIssueModule.target, 300000);
  await wBTC.connect(accounts[1]).approve(basicIssueModule.target, 250000);
  await wETH.connect(accounts[2]).approve(basicIssueModule.target, 200000);
  await wBTC.connect(accounts[2]).approve(basicIssueModule.target, 150000);
   

  //Issue BLUE CHIP tokens
  const tokenSupply = await blueChip.totalSupply();
  console.log('Token Supply:', tokenSupply);
  await basicIssueModule.issue(blueChip.target, 350, owner.address)
  const tokenSupplyUpdated = await blueChip.totalSupply();
  console.log('Updated Token Supply:', tokenSupplyUpdated);


  //Issue BLUE CHIP for other accounts

  await basicIssueModule.connect(accounts[1]).issue(blueChip.target, 20, accounts[1].address);
  await basicIssueModule.connect(accounts[2]).issue(blueChip.target, 190, accounts[2].address);

  const newTokenSupply = await blueChip.totalSupply();
  console.log("New Updated Token Supply:", newTokenSupply);

  


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