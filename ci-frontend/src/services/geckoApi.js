import axios from "axios";
const client = axios.create({ baseURL: "https://api.coingecko.com/api/v3" });


async function fetchCoinList() {
    try {
      const result = await client.get("/coins/list");
      console.log("COINS LIST: ", result.data);
    } catch (error) {
      console.error("Could not Fetch Coin List: ", error);
    }
  }


export async function getBitcoinPrice(){
  try {
    const result = await client.get("/simple/price?ids=bitcoin&vs_currencies=usd");
    console.log("BITCOIN: ", result.data.bitcoin.usd)
    return result.data.bitcoin.usd
  } catch (error) {
    console.log("Error! could not get Bitcoin price: ",error )
  }
}  

export async function getEthereumPrice(){
  try {
    const result = await client.get("/simple/price?ids=ethereum&vs_currencies=usd");
    console.log("Ethereum: ", result.data.ethereum.usd)
    return result.data.ethereum.usd
  } catch (error) {
    console.log("Error! could not get Ethereum price: ",error )
  }
}  

export async function getTetherPrice(){
  try {
    const result = await client.get("/simple/price?ids=tether&vs_currencies=usd");
    console.log("USDT: ", result.data.tether.usd)
    return result.data.tether.usd
  } catch (error) {
    console.log("Error! could not get Tether price: ",error )
  }
}  