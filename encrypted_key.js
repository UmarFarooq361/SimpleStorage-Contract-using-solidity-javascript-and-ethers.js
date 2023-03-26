
const ethers = require("ethers");
const fs = require("fs-extra");
require("dotenv").config()

async function main() {
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY)
    const encryptedjson = await wallet.encrypt(
        process.env.password,
        process.env.PRIVATE_KEY
    )
    fs.writeFileSync("./.encryptedFileKey.json", encryptedjson)
}
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1)
    });