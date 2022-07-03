//imports
const { ethers, run, network } = require("hardhat")

async function main() {
    const simpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    )
    console.log("Deploying contracts")
    const simpleStorage = await simpleStorageFactory.deploy()
    await simpleStorage.deployed()
    console.log(`Deployed contract to: ${simpleStorage.address}`)
    if (network.config.chainId == 4 && process.env.ETHERSCAN_API_KEY) {
        await simpleStorage.deployTransaction.wait(6)
        await verify(simpleStorage.address, [])
    }

    //Print the current value
    const currentValue = await simpleStorage.retrieve()
    console.log(`Current value is ${currentValue}`)
    //Update the current value
    const transactionResponseForValue = await simpleStorage.store(7)
    await transactionResponseForValue.wait(1)
    const updatedValue = await simpleStorage.retrieve()
    console.log(`Updated value is ${updatedValue}`)
    //Add person
    const transactionResponseAddPerson = await simpleStorage.addPerson(
        9,
        "Vasiliy",
        20
    )
    await transactionResponseAddPerson.wait(1)
    const person = await simpleStorage.people(0)
    console.log(
        `Added person: with index ${person.index},favorite number: ${person.favoriteNumber},name: ${person.name},age: ${person.age}`
    )
    //delete person
    transactionResponseDeletePerson = await simpleStorage.deletePerson(0)
    await transactionResponseDeletePerson.wait(1)
    const noperson = await simpleStorage.getPerson(0)
    console.log(`Person deleted with index 0: ${noperson}`)
}

//verifying contract
async function verify(contractAddress, args) {
    console.log("Verifying contract...")
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already verified!")
        } else {
            console.log(e)
        }
    }
}

//main
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
