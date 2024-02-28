const client = axios.create({ baseURL: "https://api.coingecko.com/api/v3" });


async function fetchCoinList() {
    try {
      const result = await client.get("/coins/list");
      console.log("COINS LIST: ", result.data);
    } catch (error) {
      console.error("Could not Fetch Coin List: ", error);
    }
  }