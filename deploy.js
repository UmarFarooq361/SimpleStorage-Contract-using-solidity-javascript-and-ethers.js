const { JsonRpcProvider } = require("ethers");
const ethers = require("ethers");
const fs = require("fs-extra");
require("dotenv").config()


async function main() {
    console.log("umar");
    let provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
    // for the 5.6.2 old version

    // const provider = new ethers.JsonRpcProvider("http://192.168.0.110:8545");
    // ether v6

    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    // const encryptedJson = fs.readFileSync("./.encryptedFileKey.json", "utf8");//toread encrypted key saved in json
    const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
    const binary = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.bin", "utf8");


    // ********encrypt private key 
    // let wallet = new ethers.Wallet.fromEncryptedJsonSync(encryptedJson, process.env.password)
    // wallet = await wallet.connect(provider) 

    const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
    console.log("deploying contract ....");
    const contract = await contractFactory.deploy();
    console.log(`The contract address is : ${contract.address}`)
    // const contract = await contractFactory.deploy({gasLimit: 1000000}); //overrides in deploy 
    // console.log(" Here is deployment transaction")
    // console.log(contract.deployTransaction)//transaction responce when we craete transaction
    const transactionRecipt = await contract.deployTransaction.wait(1) //receipt when we wait for transaction
    // console.log(" Here is transaction recipt")
    // console.log(transactionRecipt)
    // // wait for certioan number of block to deploy 
    // // here is one block confirmation
    // console.log(contract);

    const favNumber = await contract.retrieve()
    // console.log(favNumber) // this will print big number. so we have to convert it to string 
    console.log(`Current favourite number is : ${favNumber.toString()}`)
    const transactionResponse = await contract.store(3)
    const transactionReceipt = await transactionResponse.wait(1)
    const newFavNumber = await contract.retrieve()
    console.log(`Updated favourite number is : ${newFavNumber.toString()}`)

    //****************8888************** */
    // console.log("deploy using only transaction data")
    // const nonce = await wallet.getTransactionCount
    // const tx = {
    //     nonce: nonce,
    //     gasPrice: 20000000000,
    //     gasLimit: 1000000,
    //     to: null,
    //     value: 0,
    //     data: "0x put your binary code here ",
    //     chainId: 1337
    // }
    // // const signedResponce = await wallet.signTransaction(tx)// this actually signed the transaction
    // const sendTxTransaction = await wallet.sendTransaction(tx)// this actually send the transaction
    // await sendTxTransaction.wait(1) //wait for one block confirmation
    // console.log(sendTxTransaction)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1)
    });