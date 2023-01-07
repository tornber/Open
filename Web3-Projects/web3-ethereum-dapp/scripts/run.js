const {ethers} = require('hardhat')

const main = async () => {
    try {
    const wavePortalContractFactory = await ethers.getContractFactory('WavePortal')
    const wavePortalContract = await wavePortalContractFactory.deploy({value: ethers.utils.parseEther('0.1'),gasPrice: ethers.utils.parseUnits('2','gwei')})
    await wavePortalContract.deployed()
    console.log('contract deployed ' + wavePortalContract.address)

    let contractBalance = await ethers.provider.getBalance(wavePortalContract.address)
    console.log('contract balance is ',ethers.utils.formatEther(contractBalance))

    let waveTxn = await wavePortalContract.wave("a message")
    await waveTxn.wait()

    let waveTxn2 = await wavePortalContract.wave("a message #2")
    await waveTxn2.wait()

    contractBalance = await ethers.provider.getBalance(wavePortalContract.address)
    console.log('contract balance is ',ethers.utils.formatEther(contractBalance))

    let allWaves = await wavePortalContract.getWaves()
    console.log(allWaves)

    } catch(error) {
        console.log(error)
    }

}

const runMain = async () => {
    try {
        main()
        // process.exit(0)
    } catch(error) {
        console.log(error)
        // process.exit(1)
    }

}

runMain()