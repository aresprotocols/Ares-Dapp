// Import
const { ApiPromise, WsProvider } = require('@polkadot/api');

wsAddr = "ws://127.0.0.1:9944"

async function main() {
    console.log("main enter, before connect to ws")
    // Construct
    const wsProvider = new WsProvider(wsAddr);
    const api = await ApiPromise.create({ provider: wsProvider });

    // Do something
    console.log(api.genesisHash.toHex());
}

main().catch(console.error)