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
// import { hexlify, hexZeroPad } from "ethers/lib/utils";
const {toBeHex, zeroPadValue} = require('ethers')
// const v3InterfaceABI = require('./v3InterfaceABI');
const {time, mine} = require('@nomicfoundation/hardhat-network-helpers');
var BigNumber = require('bignumber.js');


// INTERFCE FOR PRICE ORACLE
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

  //--------------------------------------------------------------------------------------------//
  // PHASE 1: Impersonate Addresses and setup ERC20 contract instances
  //--------------------------------------------------------------------------------------------//

  // mint 1 million wETH/ wBTC 
  const INITIAL_SUPPLY = 1000000;

  // Impersonate high networth wallets
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
  

  //--------------------------------------------------------------------------------------------//
  // PHASE 2: Deploy Base System Contracts: Controller, setToken, BasicIssue Module
  //--------------------------------------------------------------------------------------------//

  // Deploy Controller
  const controller = await ethers.deployContract("Controller", [owner], owner);
  console.log("Controller Contract:", controller.target)


  // Deploy BIM Module
  const basicIssueModule = await ethers.deployContract("BasicIssuanceModule", [controller.target], owner);  
  console.log("Basic Issue Module Contract:", basicIssueModule.target)  
  
  // initialize controller
  await controller.connect(owner).initialize([owner], [basicIssueModule.target], [], [] );

  // Deploy Set Token (Blue Chip - wETH, wBTC)
  const blueChip = await ethers.deployContract("SetToken", [[wETH_ADDRESS, wBTC_ADDRESS], [5000000000000000000n, 200000000n], [basicIssueModule.target], controller.target ,owner, "BLUE CHIP", "BLUE"], owner);
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


  //--------------------------------------------------------------------------------------------//
  // PHASE 3: Issue BLUE CHIP set token using BIM module
  //--------------------------------------------------------------------------------------------//


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


  //--------------------------------------------------------------------------------------------//
  // PHASE 4: Deploy Price Oracle Contract 
  //--------------------------------------------------------------------------------------------//
  
  // BTC/USD - 0xc907E116054Ad103354f2D350FD2514433D57F6f
  // ETH/USD - 0xF9680D99D6C9589e2a93a78A04A279e509205945
  // BTC/ETH - 0x19b0F0833C78c0848109E3842D34d2fDF2cA69BA

  // USDT/ ETH - 0xf9d5AAC6E5572AEFa6bd64108ff86a222F69B64d
  // USDT/ USD - 0x0A6513e40db6EB1b165753AD52E80663aeA50545


  //Getting BTC Price directly from Chainlink Oracles
  const v3Contract = await hre.ethers.getContractAt(aggregatorV3InterfaceABI, '0xc907E116054Ad103354f2D350FD2514433D57F6f');
  const btcusdPrice = await v3Contract.latestRoundData();
  console.log("BTC USD Price: ", btcusdPrice)


  // Deploy Price Oracle
  // Controller
  // masterQuoteAsset - address of asset that can be used to link unrelated asset prices
  // Adapters - used to price assets created by other protocols
  // assetOnes - list of first asset in pair
  // assetTwos - list of second asset in pair
  // Oracles - list of oracles
  const priceOracle = await ethers.deployContract("PriceOracle", [controller.target, USDT_ADDRESS, [], [wBTC_ADDRESS, wETH_ADDRESS], [USDT_ADDRESS, USDT_ADDRESS],   ['0xc907E116054Ad103354f2D350FD2514433D57F6f', '0xF9680D99D6C9589e2a93a78A04A279e509205945'] ], owner)
  console.log("Price Oracle: ", priceOracle.target);

  // Adding price Oracle to controller as Resource
  controller.connect(owner).addResource(priceOracle.target, 1);


  //Get Price for ETH/ USDT, BTC/ USDT, ETH/ BTC.
  const ethusdtprice = await priceOracle.connect(accounts[0]).getPrice(wETH_ADDRESS,USDT_ADDRESS);
  console.log("ETH/ USDT Price: ", String(ethusdtprice)/10**8 );

  const btcusdtprice = await priceOracle.connect(accounts[0]).getPrice(wBTC_ADDRESS, USDT_ADDRESS);
  console.log("BTC/ USDT Price: ", String(btcusdtprice)/10**8 );

  const ethbtcprice = await priceOracle.connect(accounts[0]).getPrice( wBTC_ADDRESS, wETH_ADDRESS);
  console.log("ETH / BTC Price: ", String(ethbtcprice)/10**18 )


  //--------------------------------------------------------------------------------------------//
  // PHASE 5: Deploy Set Valuer to value BLUE CHIP based on holdings
  //--------------------------------------------------------------------------------------------//

  // DEPLOY SET VALUER
  const setValuer = await ethers.deployContract("SetValuer", [controller.target]);
  
  // Adding set Valuer to controller as module
  // SET VALUER MUST BE RESOURCE WITH ID - 2
  await controller.connect(owner).addResource(setValuer.target, 2);
  
  
  const checkSystemContract = await controller.isSystemContract(setValuer.target);
  console.log("Check if Set Valuer is system contract: ", checkSystemContract );


  // Fetch Valuation of Set Token (BLUE CHIP) in USDT
  const setValuation  = await setValuer.calculateSetTokenValuation(blueChip.target, USDT_ADDRESS);
  console.log("Please Get Set token Valuation 🙏: ", String(setValuation)/10**8);


  // Calculating Valuation Manually
  // console.log("BLUE Balance| wBTC:", String(BLUEwBTCbalance)/10**8, ' wETH: ', String(BLUEwETHbalance)/10**18);

  const btcValuation =  (Number(BLUEwBTCbalance)/10**8) * (Number(btcusdtprice)/10**8)
  const ethValuation = (Number(BLUEwETHbalance)/10**18) * (Number(ethusdtprice)/10**8)
  const blueValuation = (btcValuation + ethValuation)/(Number(newTokenSupply)/10**18);
  console.log("Calculated BLUE Valuation: ", blueValuation)


  //--------------------------------------------------------------------------------------------//
  // PHASE 6: Deploy Net Asset Value Issuance Module
  //--------------------------------------------------------------------------------------------//

  // Deploy NAV Issuance Module
  const NAVModule = await ethers.deployContract("CustomOracleNavIssuanceModule", [controller.target, wETH_ADDRESS])

  // Add NAV to Controller as module
  await controller.connect(owner).addModule(NAVModule.target);
  // Add NAV to SetToken as module
  await blueChip.connect(owner).addModule(NAVModule.target);

  // initialize NAV Module
  // * @param _setToken                     Instance of the SetToken to issue
  // * @param _navIssuanceSettings          NAVIssuanceSettings struct defining parameters
  //   struct NAVIssuanceSettings {
  //     INAVIssuanceHook managerIssuanceHook;          // Issuance hook configurations
  //     INAVIssuanceHook managerRedemptionHook;        // Redemption hook configurations
  //     ISetValuer setValuer;                          // Optional custom set valuer. If address(0) is provided, fetch the default one from the controller
  //     address[] reserveAssets;                       // Allowed reserve assets - Must have a price enabled with the price oracle
  //     address feeRecipient;                          // Manager fee recipient
  //     uint256[2] managerFees;                        // Manager fees. 0 index is issue and 1 index is redeem fee (0.01% = 1e14, 1% = 1e16)
  //     uint256 maxManagerFee;                         // Maximum fee manager is allowed to set for issue and redeem
  //     uint256 premiumPercentage;                     // Premium percentage (0.01% = 1e14, 1% = 1e16). This premium is a buffer around oracle
  //                                                    // prices paid by user to the SetToken, which prevents arbitrage and oracle front running
  //     uint256 maxPremiumPercentage;                  // Maximum premium percentage manager is allowed to set (configured by manager)
  //     uint256 minSetTokenSupply;                     // Minimum SetToken supply required for issuance and redemption
  //                                                    // to prevent dramatic inflationary changes to the SetToken's position multiplier
  // }

  // CAIUTION: DOES NOT WORK WELL WITH MANAGER FEE ENABLED
  // THROW REVERT: "Invalid post transfer balance"

  let navIssuanceSettings = {
    managerIssuanceHook: '0x0000000000000000000000000000000000000000',
    managerRedemptionHook: '0x0000000000000000000000000000000000000000',
    setValuer: setValuer.target,
    reserveAssets: [USDT_ADDRESS, wETH_ADDRESS, wBTC_ADDRESS],
    feeRecipient: accounts[0],
    managerFees: [0, 0],
    maxManagerFee: 500000000000000n,
    premiumPercentage: 100000000000000n,
    maxPremiumPercentage: 500000000000000n,
    minSetTokenSupply: 10000000000000000n
  }

  // INITIALIZE NAV Module with NAV ISSUEANCE SETTINGS
  console.log("transaction initiated ... ")
  await NAVModule.connect(owner).initialize(blueChip.target, navIssuanceSettings)

  // Checking if NAV module is system contract
  const checkSystemContractNAV = await controller.isSystemContract(NAVModule.target);
  console.log("Check if NAV Module is system contract: ", checkSystemContractNAV );


  //--------------------------------------------------------------------------------------------//
  // PHASE 7: Issue BLUE CHIP set token using NAV module
  //-------------------------------------------------------------------------------------------//

  // Checking BTC balance for owner
  const currentBTCBalance =  await wBTC.balanceOf(accounts[0]);
  console.log("WBTC Balance for Owner:", String(currentBTCBalance)/10**8 );

  // Approve BTC balance to NAV module for user
  await wBTC.connect(owner).approve(NAVModule.target, 2500000000n); // 5BTC
  await wETH.connect(owner).approve(NAVModule.target, 20000000000000000000n); //20 WETH


  // Check Issuance is valid using: isIssueValid and getExpectedSetTokenIssueQuantity
  const boolResult = await NAVModule.isIssueValid(blueChip.target, wBTC_ADDRESS, 100000000n);
  console.log("Is it valid to buy Blue Chip with  wBTC: ", boolResult);

  // Check Issuance is valid using: getExpectedSetTokenIssueQuantity
  const expectedIssuance = await NAVModule.getExpectedSetTokenIssueQuantity(blueChip.target, wBTC_ADDRESS, 1000000000n);
  console.log("Expected output of BLUE Tokens for 10 wBTC: ", String(expectedIssuance)/10**18);

  // Checking BLUE CHIP BALANCE before minting new tokens
  const beforeNAVTokenSupply = await blueChip.totalSupply();
  console.log("DID NAV Module incresed Token Supply:", String(beforeNAVTokenSupply)/10**18);

  /** 
  * Deposits the allowed reserve asset into the SetToken and mints the appropriate % of Net Asset Value of the SetToken
  * to the specified _to address.
  * function issue(
  * @param ISetToken _setToken                     Instance of the SetToken contract
  * @param address _reserveAsset                 Address of the reserve asset to issue with
  * @param uint256 _reserveAssetQuantity         Quantity of the reserve asset to issue with
  * @param uint256 _minSetTokenReceiveQuantity   Min quantity of SetToken to receive after issuance
  * @param address _to                           Address to mint SetToken to
  */

  // Issue Set Token using NAV MODULE
  await NAVModule.connect(accounts[0]).issue(blueChip.target, wBTC_ADDRESS, 1000000000n, 4284548152349290n, accounts[0].address ) // Mint for 3 BTC 

  // Checking BLUE CHIP BALANCE after minting new tokens
  const afterNAVTokenSupply = await blueChip.totalSupply();
  console.log("DID NAV Module incresed Token Supply:", String(afterNAVTokenSupply)/10**18);


  // Checking Set Token Balance of ETH and BTC
  const newBTCbalance = await wBTC.balanceOf(blueChip.target);
  const newETHbalance =  await wETH.balanceOf(blueChip.target);
  console.log("BLUE Balance| wBTC:", String(newBTCbalance)/10**8, ' wETH: ', String(newETHbalance)/10**18);



  //----------------------------------------------//
  // PHASE 8: Deploy Integration Registry
  //----------------------------------------------//


  // Deploy Integration Registry
  const integrationRegistry = await hre.ethers.deployContract("IntegrationRegistry", [controller.target], owner);

  // Add Integration Registry to Controller
  await controller.connect(owner).addResource(integrationRegistry.target, 0);

  // Check if IR is System Contract
  const checkSystemContractIR = await controller.isSystemContract(integrationRegistry.target);
  console.log("Check if Integration Registry is system contract: ", checkSystemContractIR );


  // Deploy General Index Module
  const generalIndex = await ethers.deployContract("GeneralIndexModule", [controller.target, wETH_ADDRESS], owner);
  
  // Add module to Controller
  await controller.connect(owner).addModule(generalIndex.target);
  // Add module to Set Token
  await blueChip.connect(owner).addModule(generalIndex.target);

  // Initialize Module
  await generalIndex.connect(owner).initialize(blueChip.target);
  const indexModuleState = await blueChip.isInitializedModule(generalIndex.target);

  console.log("General Index Module Initialised : ", indexModuleState);

  // Check if GIM is system contract
  const checkSystemContractGIM = await controller.isSystemContract(generalIndex.target);
  console.log("Check if General Index Module is system contract: ", checkSystemContractGIM );



  //----------------------------------------------//
  // PHASE 9
  //----------------------------------------------//
  // SET GIM Parameters
  // params: max Trade Size, coolOffPeriod, exchange to trade
  console.log("Allowed Traders Original: ",await generalIndex.connect(owner).getAllowedTraders(blueChip.target));
  await generalIndex.connect(owner).setAnyoneTrade(blueChip.target, true);
  console.log("Allowed Traders Now: ",await generalIndex.connect(owner).getAllowedTraders(blueChip.target));


  // Config Trade Maximums for Components
  // @params: setToken, components, maximums
  await generalIndex.connect(owner).setTradeMaximums(blueChip.target, [wETH_ADDRESS, wBTC_ADDRESS], [130000000000000000000n, 700000000n]) //12 ETH, 7 BTC
  // 126713633106296360000n
  // 130000000000000000000n
  // Config Cool Off Period
  // @params: set, components[], uint256[] cooloffperiod
  await generalIndex.connect(owner).setCoolOffPeriods(blueChip.target, [wETH_ADDRESS, wBTC_ADDRESS], [10, 10])


  // Adapter List
  // https://docs.indexcoop.com/index-coop-community-handbook/protocol/index-protocol#adapters
  // 0x2b235Ab7f53c150A2bB26ee7c291b5A542da62dC - ZeroExApiAdapter
  // 0xE592427A0AEce92De3Edee1F18E0157C05861564 - UniswapV3SwapRouter
  // 0x11111112542D85B3EF69AE05771c2dCCff4fAa26 - AggregationRouter1inchV3


  // Deploy Exchange Adapters
  const uniswapV3IndexExchangeAdapter =  await hre.ethers.deployContract("UniswapV3IndexExchangeAdapter", ['0xE592427A0AEce92De3Edee1F18E0157C05861564'], owner);
  const router = await uniswapV3IndexExchangeAdapter.getSpender();
  console.log("Uniswap Router Spender: ", router);


  // Add Adaptors for trading in IR - single integration
  // module, name, adapter
  // await integrationRegistry.connect(owner).addIntegration(generalIndex.target, "ZeroExApiAdapter", '0x2b235Ab7f53c150A2bB26ee7c291b5A542da62dC' );
  await integrationRegistry.connect(owner).addIntegration(generalIndex.target, "UniswapV3SwapRouter", uniswapV3IndexExchangeAdapter);


  // Getting Integration Registry
  // const zeroExAdapter = await integrationRegistry.connect(owner).getIntegrationAdapter(generalIndex.target, "ZeroExApiAdapter");
  // console.log("Retrieved Zero Ex Adapter: ", zeroExAdapter);
  const uniswapAdapter = await integrationRegistry.connect(owner).getIntegrationAdapter(generalIndex.target, "UniswapV3SwapRouter");
  console.log("Retrieved Uniswap Adapter: ", uniswapAdapter);



  // Config Exchanges
  // @params: setToken, components[], exchangeNames[]
  await generalIndex.connect(owner).setExchanges(blueChip.target, [wBTC_ADDRESS, wETH_ADDRESS], ["UniswapV3SwapRouter", "UniswapV3SwapRouter"])
  // @params: setToken, compoenents[],bytes[] exchangeData
  const uniBytes = "0x";
  const wbtcBytes = "0x7890";
  const uniswapData = zeroPadValue(toBeHex(3000), 3)
  await generalIndex.connect(owner).setExchangeData(blueChip.target, [wBTC_ADDRESS, wETH_ADDRESS], [uniswapData, uniswapData])

  const newMultiplier = await blueChip.positionMultiplier();
  console.log("POSITION MULTIPLIER: ", newMultiplier);
  //startRebalance ( setToken, address[] newComponents, unit256[] _newComponentTargetUnits, unit256[] oldComponentTargetUnits, unit256 positionMultipiler)
  await generalIndex.connect(owner).startRebalance(blueChip.target, [], [], [ 5000000000000000000n, 200000000n ], newMultiplier  ) //4 ETH, 3 BTC
  console.log("Target Balance Units==> wETH: 4.000000000000000000, wBTC: 3.00000000 ", )
  // // getRebalanceComponents (set) --> Array of _setToken components involved in rebalance
  // const rebalanceComponents = await generalIndex.connect(owner).getRebalanceComponents(blueChip.target);
  // console.log('Rebalancing Comonents: ', rebalanceComponents)
  
  // getComponentTradeQuantityAndDirection (set, one component) --> (isSendTokenFixed, componentQuantity)
  const ethDirection = await generalIndex.connect(owner).getComponentTradeQuantityAndDirection(blueChip.target, wETH_ADDRESS)
  console.log("ETH Direction: ",ethDirection[0], Number(ethDirection[1])/10**18 );

  const btcDirection = await generalIndex.connect(owner).getComponentTradeQuantityAndDirection(blueChip.target, wBTC_ADDRESS)
  console.log("BTC Direction: ",btcDirection[0], Number(btcDirection[1])/10**8 );
  

  // NEW COMPONENTS
  for(const component of components){
    const defaultPos = await blueChip.getDefaultPositionRealUnit(component);
    const realUnit = await blueChip.getTotalComponentRealUnits(component);
    if(component === wETH_ADDRESS){
      console.log("component: ", component, " Default position: ", Number(defaultPos)/10**18, " total comp real unit: ", Number(realUnit)/10**18); 
    } else if (component === wBTC_ADDRESS){
      console.log("component: ", component, " Default position: ", Number(defaultPos)/10**8, " total comp real unit: ", Number(realUnit)/10**8); 
    }
  }

  // Check BLUE Token Contract Balance
  const beforeBLUEwBTCbalance = await wBTC.balanceOf(blueChip.target);
  const beforeBLUEwETHbalance =  await wETH.balanceOf(blueChip.target);
  console.log("BLUE Balance| wBTC:", String(beforeBLUEwBTCbalance)/10**8, ' wETH: ', String(beforeBLUEwETHbalance)/10**18);


  const isOwnerAllowedTrader = await generalIndex.getIsAllowedTrader(blueChip.target, owner.address);
  console.log("Owner is allowed Trader ? ", isOwnerAllowedTrader);

  const isAccount1AllowedTrader = await generalIndex.getIsAllowedTrader(blueChip.target, accounts[1].address);
  console.log("Account 1 is Allowed Trader ? ", isAccount1AllowedTrader);

  // Trading ASSETS TO REBALANCE
  // Allowance (owner, spender)
  // const btcAllowance = await wBTC.allowance(blueChip.target, generalIndex.target);
  // await wBTC.increaseAllowance()
  // const ethAllowance = await wETH.allowance(blueChip.target, generalIndex.target);

  // console.log("Allowance for BTC: ", btcAllowance, ", ETH: ", ethAllowance); 
  const estimnateETHRecieve = Number(btcDirection[1])/10**8 * Number(ethbtcprice)/10**18
  console.log("Estinate ETH to recieve: ", estimnateETHRecieve*10**18);

  
  const executionInfoETH = await generalIndex.executionInfo(blueChip.target, wETH_ADDRESS);
  const executionInfoBTC = await generalIndex.executionInfo(blueChip.target, wBTC_ADDRESS);
  // @return params: executionInfo
  // uint256 targetUnit; // Target unit of component for Set
  // uint256 maxSize; // Max trade size in precise units
  // uint256 coolOffPeriod; // Required time between trades for the asset
  // uint256 lastTradeTimestamp; // Timestamp of last trade
  // string exchangeName; // Name of exchange adapter
  // bytes exchangeData; // Arbitrary data that can be used to encode exchange specific settings (fee tier) or features (multi-hop)
  console.log("Execution Info: weth ", executionInfoETH, " wbtc: ", executionInfoBTC)


  const rebalanceInfo = await generalIndex.rebalanceInfo(blueChip.target);
  // @return params: rebalanceInfo
  // uint256 positionMultiplier; // Position multiplier at the beginning of rebalance
  // uint256 raiseTargetPercentage; // Amount to raise all unit targets by if allowed (in precise units)
  // address[] rebalanceComponents; // Array of components involved in rebalance
  console.log("Rebalance Info: ", rebalanceInfo);

  const ZERO = new BigNumber(0)
  // console.log("ZERO: ", ZERO)
  const zero = "0x0000000000000000000000000000000000000000000000000000000000000000"
  const maxuint256 = "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
  // settoken, component, _ethQuantityLimit -> Max/min amount of ETH spent/received during trade
  // await generalIndex.initialize(blueChip.target);
  await generalIndex.connect(owner).trade(blueChip.target, wBTC_ADDRESS, zero) // Trading wBTC and expecting min amount of wETH to recieve
  



  // Check BLUE Token Contract Balance
  const afterBLUEwBTCbalance = await wBTC.balanceOf(blueChip.target);
  const afterBLUEwETHbalance =  await wETH.balanceOf(blueChip.target);
  console.log("BLUE Balance| wBTC:", String(afterBLUEwBTCbalance)/10**8, ' wETH: ', String(afterBLUEwETHbalance)/10**18);

  


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
// // IntegrationRegistry will always be resource ID 0 in the system
// uint256 constant internal INTEGRATION_REGISTRY_RESOURCE_ID = 0;
// // PriceOracle will always be resource ID 1 in the system
// uint256 constant internal PRICE_ORACLE_RESOURCE_ID = 1;
// // SetValuer resource will always be resource ID 2 in the system
// uint256 constant internal SET_VALUER_RESOURCE_ID = 2;

// 38.245+5.88 = 32.365
// 16.298+7 =  23.298