const { ethers } = require("hardhat")
const { expect, assert } = require("chai")

describe("SimpleStorage", function () {
    let simpleStorageFactory, simpleStorage
    beforeEach(async function () {
        simpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
        simpleStorage = await simpleStorageFactory.deploy()
    })

    it("Should start with favorite number of 0", async function () {
        const currentValue = await simpleStorage.retrieve()
        const expectedValue = "0"
        assert.equal(currentValue.toString(), expectedValue)
    })

    it("Should update favorite number", async function () {
        const trxResponseupdatedValue = await simpleStorage.store(9)
        await trxResponseupdatedValue.wait(1)
        const updatedValue = await simpleStorage.retrieve()
        const expectedValue = "9"
        assert.equal(updatedValue.toString(), expectedValue)
    })

    it("Should start index with 0", async function () {
        const currentIndex = await simpleStorage.retrieveIndex()
        const expectedValue = "0"
        assert.equal(currentIndex.toString(), expectedValue)
    })

    it("Should add person", async function () {
        const trxResponseAddPerson = await simpleStorage.addPerson(
            9,
            "Vasiliy",
            15
        )
        await trxResponseAddPerson.wait(1)
        const person = await simpleStorage.people(0)
        assert.equal(person.name.toString(), "Vasiliy")
        assert.equal(person.favoriteNumber, 9)
        assert.equal(person.age, 15)
    })

    it("Should get person", async function () {
        const trxResponseAddPerson = await simpleStorage.addPerson(
            9,
            "Vasiliy",
            15
        )
        await trxResponseAddPerson.wait(1)
        const person = await simpleStorage.people(0)
        assert.equal(person.name.toString(), "Vasiliy")
        assert.equal(person.favoriteNumber, 9)
        assert.equal(person.age, 15)
    })
    it("Should delete person", async function () {
        const trxResponseAddPerson = await simpleStorage.addPerson(
            9,
            "Vasiliy",
            15
        )
        await trxResponseAddPerson.wait(1)
        const trxResponseDeletePerson = await simpleStorage.deletePerson(0)
        await trxResponseDeletePerson.wait(1)
        const person = await simpleStorage.people(0)
        assert.equal(person.name.toString(), "")
        assert.equal(person.favoriteNumber, 0)
        assert.equal(person.age, 0)
    })
})
