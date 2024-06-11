# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```

```shell
yarn hardhat run --network testnet scripts/deploy.js
yarn hardhat verify --network testnet <address> <constructor input opcode>
Example:
yarn hardhat verify --network bscTestnet 0xE98F36e22e4e13a123f325e1B52108765e133eAe "Wrapped Ethereum" "wETH"
```

Scripts to Verify Contracts

```shell
yarn hardhat verify --network bscTestnet 0xA49e29D2E987651b7C9476206EA423e7F058Ff65 "Wrapped Bitcoin" "wBTC"
yarn hardhat verify --network bscTestnet 0x346F7bDb9552BE08501248059f739F9542AEA37A "0x9970de3A60203CE6dBa1ac9aB5Ff03ac27C52aF3"
yarn hardhat verify --network bscTestnet 0xa9bF2f88990F3693a7c7fdE35DA1aA9dd309CDdd "0x346F7bDb9552BE08501248059f739F9542AEA37A"
```

👇👇👇This does not work: Refer to verify_script.js for correct implementation

```shell
yarn hardhat verify --network bscTestnet 0x33d00051ABd6D46E710adeaa321985e8eba1960f "["0xE98F36e22e4e13a123f325e1B52108765e133eAe","0xA49e29D2E987651b7C9476206EA423e7F058Ff65"]" "[3000000000000000000n,1000000000000000000n]" "["0xa9bF2f88990F3693a7c7fdE35DA1aA9dd309CDdd"]" "0x346F7bDb9552BE08501248059f739F9542AEA37A" "0x9970de3A60203CE6dBa1ac9aB5Ff03ac27C52aF3" "Blue Chip" "BLUE"
```

//bugs
STF - usually revert because msg.sender does not have enough spending approvals
