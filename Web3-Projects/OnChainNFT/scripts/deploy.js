const main = async () => {
    try {
        const nftContractFactory = await hre.ethers.getContractFactory('chainBattles');
        const nftContract = await nftContractFactory.deploy()
        await nftContract.deployed()

        console.log("nft contract deployed at",nftContract.address)
        process.exit(0)
    } catch(error) {
        console.log(error)
        process.exit(1)
    }
}

main()