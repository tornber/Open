const {ethers} = require("hardhat")

let address 

const main = async () => {
    try {
        
        const waveContractFactory = await ethers.getContractFactory('WavePortal')
        const waveContract = await waveContractFactory.deploy({value: ethers.utils.parseEther('0.001')})
        await waveContract.deployed()
        console.log("contract deployed at address",waveContract.address)
        
    } catch(error) {
        console.log(error.message)
    }
}

const runMain = async () => {
    try {
        main()
        // process.exit(0)
    } catch(error) {
        console.log(error.message)
        // process.exit(1)
    }
}

runMain()