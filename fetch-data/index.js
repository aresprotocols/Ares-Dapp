// Import
const { ApiPromise, Keyring, WsProvider } = require('@polkadot/api');
const { UnsubscriptionError } = require('rxjs');

wsAddr = "ws://127.0.0.1:9944"

async function main() {
    console.log("main enter, before connect to ws")
    // Construct
    const wsProvider = new WsProvider(wsAddr);
    const api = await ApiPromise.create({ 
        provider: wsProvider,
        types: {
            "TokenSpec": "Vec<u8>",
            "Aggregator": {
                "account_id": "AccountId",
                "block_number": "BlockNumber",
                "source": "Vec<u8>",
                "alias": "Vec<u8>",
                "url": "Vec<u8>"
            },
            "Request": {
                "aggregator_id": "AccountId",
                "block_number": "BlockNumber",
                "token": "Vec<u8>",
                "work_id": "Hash"
            },
            "AggregateResult": {
                "block_number": "BlockNumber",
                "price": "u64"
            }
        }
    });

    // Do something
    //===================================
    console.log(api.genesisHash.toHex());
    // Retrieve the chain name
    const chain = await api.rpc.system.chain();

    // Retrieve the latest header
    const lastHeader = await api.rpc.chain.getHeader();

    // Log the information
    console.log(`${chain}: last block #${lastHeader.number} has hash ${lastHeader.hash}`);
    
    //transfer test
    const keyring = new Keyring({ type: 'sr25519' });
    const aliceAccount = keyring.addFromUri('//Alice');
    const bobAccount = keyring.addFromUri('//Bob');

    console.log(`alice:${aliceAccount.address}`);
    console.log(`bob:${bobAccount.address}`);
    console.log("transfer...")

    const txHash = await api.tx.balances
    .transfer(bobAccount.address, 1000000000000000)
    .signAndSend(aliceAccount, ({ events = [], status}) => {
        console.log(`current status is ${status.type}`);

        if (status.isFinalized) {
            console.log(`transaction included at blockHash ${status.asFinalized}`);

            events.forEach(({phase, event: {data, method, section}}) => {
                console.log(`\t ${phase}: ${section}.${method}:: ${data}`);
            });
            //unsub();
        }
    });

    console.log(`submit with hash ${txHash}`)
    //====================================
}

main().catch(console.error)