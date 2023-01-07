const hre = require('hardhat')

async function main() {
    const BuyCoffeeContractFactory = await hre.ethers.getContractFactory('BuyMeACoffee') 

    // deploy contract
  const BuyCoffeeContract = await BuyCoffeeContractFactory.deploy()
  await BuyCoffeeContract.deployed()
  console.log("BuyMeACoffe contract deployed at",BuyCoffeeContract.address)
}


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  